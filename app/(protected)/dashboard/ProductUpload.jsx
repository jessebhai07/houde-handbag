"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Trash2, UploadCloud, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const FALLBACK_CATEGORIES = [
  "Back Pack",
  "Tool Bag",
  "Makeup Bag",
  "Shoulder Strap",
  "Insulated bag",
  "Waterproof Bag",
  "Game Case",
  "Laptop Bag",
  "Tablet cases",
  "Headphone Bag",
];

export default function ProductUpload() {
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ for showing ALL images: per-product selected preview
  const [previewById, setPreviewById] = useState({}); // { [productId]: imageUrl }

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

      if (!res.ok) {
        setCategories(FALLBACK_CATEGORIES);
        throw new Error(data?.message || "Failed to fetch");
      }

      setProducts(data.products || []);
      setCategories(
        data.categories && data.categories.length > 0
          ? data.categories
          : FALLBACK_CATEGORIES
      );
    } catch (err) {
      console.error(err);
      setCategories(FALLBACK_CATEGORIES);
      toast.error(err?.message || "Failed to load products.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const allCategories = useMemo(() => {
    const fromProducts = (products || []).map((p) => p.category).filter(Boolean);
    const merged = [...(categories || []), ...fromProducts];
    return Array.from(new Set(merged));
  }, [products, categories]);

  const [activeTab, setActiveTab] = useState("all");
  useEffect(() => {
    // if current tab disappears, fall back to all
    if (activeTab !== "all" && !allCategories.includes(activeTab)) {
      setActiveTab("all");
    }
  }, [allCategories, activeTab]);

  const visibleProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return (products || []).filter((p) => p.category === activeTab);
  }, [products, activeTab]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error("Please select a category.");
    if (selectedFiles.length === 0)
      return toast.error("Please select at least one image.");
    if (selectedFiles.length > 10) return toast.error("Max 10 images allowed.");

    setLoading(true);

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

      toast.success("Product uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to delete");

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Product removed successfully.");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Could not delete product.");
    }
  };

  const getPreview = (product) =>
    previewById[product._id] || product.images?.[0] || null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Product Management
        </h1>
        <p className="text-muted-foreground">
          Upload images to Cloudinary and manage your inventory.
        </p>
      </div>

      <Card className="border-dashed border-2 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5" />
            Upload New Product
          </CardTitle>
          <CardDescription>
            Select a category and choose up to 10 images.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category" type="button">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(categories.length ? categories : FALLBACK_CATEGORIES).map(
                      (cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                <Input
                  ref={fileInputRef}
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setSelectedFiles(Array.from(e.target.files || []))
                  }
                  className="cursor-pointer file:text-primary"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file(s) selected`
                    : "Max 10 images (JPG, PNG, WebP)"}
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto md:ml-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Uploading..." : "Upload Product"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Inventory</h2>

        {fetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[340px] w-full rounded-xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-slate-50">
            <p className="text-muted-foreground">No products uploaded yet.</p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <TabsList className="flex flex-wrap h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                {allCategories.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{visibleProducts.length}</span>{" "}
                item(s)
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProducts.map((product) => {
                  const preview = getPreview(product);
                  const imgs = product.images || [];

                  return (
                    <Card
                      key={product._id}
                      className="overflow-hidden group hover:shadow-lg transition-all duration-300"
                    >
                      {/* ✅ main preview (no /_next/image proxy) */}
                      <div className="relative h-56 w-full bg-slate-100">
                        {preview ? (
                          <Image
                            src={preview}
                            alt={product.category}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
                          {imgs.length} Photos
                        </div>
                      </div>

                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">{product.category}</CardTitle>
                        <CardDescription>
                          {new Date(product.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>

                      {/* ✅ show ALL images as thumbnails */}
                      {imgs.length > 1 && (
                        <CardContent className="px-4 pb-3">
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {imgs.map((src, idx) => {
                              const isActive = src === preview;
                              return (
                                <button
                                  key={`${product._id}-${idx}`}
                                  type="button"
                                  onClick={() =>
                                    setPreviewById((prev) => ({
                                      ...prev,
                                      [product._id]: src,
                                    }))
                                  }
                                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border transition ${
                                    isActive
                                      ? "border-primary ring-2 ring-primary/20"
                                      : "border-border hover:border-primary/60"
                                  }`}
                                  title={`Image ${idx + 1}`}
                                >
                                  <Image
                                    src={src}
                                    alt={`${product.category} ${idx + 1}`}
                                    fill
                                    unoptimized
                                    sizes="56px"
                                    className="object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-2 text-[11px] text-muted-foreground">
                            Tip: click thumbnails to change the main preview
                          </p>
                        </CardContent>
                      )}

                      <CardFooter className="p-4 pt-0">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full gap-2"
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently
                                delete the{" "}
                                <span className="font-semibold text-foreground">
                                  {product.category}
                                </span>{" "}
                                product and its images.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
