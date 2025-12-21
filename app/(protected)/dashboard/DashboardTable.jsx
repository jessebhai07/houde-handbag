"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import CategoriesTabs from "./CategoriesTabs";
import UploadCard from "./UploadCard";

const FALLBACK_CATEGORIES = [
  "Back Pack",
  "Tool Bag",
  "Makeup Bag",
  "Shoulder Strap",
  "Cooler Bag",
  "Waterproof Bag",
  "Game Case",
  "Laptop Bag",
  "Flat Screen",
  "Headphone Bag",
];

export default function DashboardTable() {
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/products", {
        credentials: "include",
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) throw new Error(data?.message || "Failed to fetch");

      setProducts(data.products || []);
      setCategories(
        data.categories && data.categories.length > 0
          ? data.categories
          : FALLBACK_CATEGORIES
      );
    } catch (e) {
      console.error(e);
      setCategories(FALLBACK_CATEGORIES);
      toast.error(e?.message || "Failed to load products");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // keep tab valid
  const allCats = useMemo(() => {
    const fromProducts = (products || [])
      .map((p) => p.category)
      .filter(Boolean);
    return Array.from(new Set([...(categories || []), ...fromProducts]));
  }, [categories, products]);

  useEffect(() => {
    if (activeTab !== "all" && !allCats.includes(activeTab))
      setActiveTab("all");
  }, [activeTab, allCats]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error("Please select a category.");
    if (selectedFiles.length === 0)
      return toast.error("Select at least 1 image.");
    if (selectedFiles.length > 10)
      return toast.error("Max 10 images per upload.");

    setUploading(true);

    const formData = new FormData();
    formData.append("category", selectedCategory);
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Upload failed");

      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      await fetchProducts();
      toast.success("Uploaded!");
    } catch (e2) {
      console.error(e2);
      toast.error(e2?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (productId, url) => {
    const snapshot = products;

    // optimistic UI
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId
          ? { ...p, images: (p.images || []).filter((x) => x !== url) }
          : p
      )
    );

    try {
      const res = await fetch(
        `/api/products/${productId}/images?url=${encodeURIComponent(url)}`,
        { method: "DELETE", credentials: "include" }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to delete image");

      if (data?.product?._id) {
        setProducts((prev) =>
          prev.map((p) => (p._id === data.product._id ? data.product : p))
        );
      }

      toast.success("Image deleted");
    } catch (e) {
      toast.error(e?.message || "Could not delete image");
      setProducts(snapshot); // rollback instantly
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Products
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Upload images by category, and manage them individually.
        </p>
      </div>

      <UploadCard
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        loading={uploading}
        onSubmit={handleUpload}
        fileInputRef={fileInputRef}
      />

      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Gallery
        </h2>

        <CategoriesTabs
          categories={categories}
          products={products}
          fetching={fetching}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}
