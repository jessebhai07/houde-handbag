"use client";

import { useEffect, useMemo, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

function CloudTile({ src, alt, preload = false }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative w-full overflow-hidden rounded-xl border bg-muted/20"
          title="View"
        >
          <div className="relative aspect-4/3 w-full">
            <CldImage
              src={src}
              alt={alt}
              fill
              className="object-contain p-2  hover:scale-105 duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
              preload={preload}
            />
          </div>
        </button>
      </DialogTrigger>

      {/* ✅ big view */}
      <DialogContent className="max-w-6xl p-2 sm:p-4">
        <div className="relative w-full h-[80vh]  rounded-lg overflow-hidden bg-black/5">
          <CldImage
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            // don’t preload the modal image; it loads when opened
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PublicProductsGallery() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchPublicProducts = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/products/public", { cache: "no-store" });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) throw new Error(data?.message || "Failed to load");

      setProducts(data.products || []);
      setCategories(
        data.categories && data.categories.length > 0
          ? data.categories
          : FALLBACK_CATEGORIES
      );
    } catch (e) {
      console.error(e);
      setProducts([]);
      setCategories(FALLBACK_CATEGORIES);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  const productByCategory = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => map.set(p.category, p));
    return map;
  }, [products]);

  const allCategories = useMemo(() => {
    const fromProducts = (products || []).map((p) => p.category).filter(Boolean);
    return Array.from(new Set([...(categories || []), ...fromProducts]));
  }, [categories, products]);

  useEffect(() => {
    if (activeTab !== "all" && !allCategories.includes(activeTab)) {
      setActiveTab("all");
    }
  }, [activeTab, allCategories]);

  if (fetching) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // ✅ simple “preload only first visible image”
  const shouldPreload = (catIndex, imgIndex) => {
    if (activeTab === "all") return catIndex === 0 && imgIndex === 0;
    return imgIndex === 0; // first image of the selected category
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex flex-wrap h-auto">
        <TabsTrigger value="all">All</TabsTrigger>
        {allCategories.map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* All */}
      <TabsContent value="all" className="mt-6 space-y-10">
        {allCategories.map((cat, catIndex) => {
          const product = productByCategory.get(cat);
          const imgs = product?.images || [];

          return (
            <section key={cat} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{cat}</h3>
                <Badge variant="secondary">{imgs.length} item(s)</Badge>
              </div>

              {imgs.length === 0 ? (
                <div className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground">
                  No images in this category.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imgs.map((src, idx) => (
                    <CloudTile
                      key={`${product._id}-${idx}`}
                      src={src}
                      alt={`${cat} ${idx + 1}`}
                      preload={shouldPreload(catIndex, idx)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </TabsContent>

      {/* Per-category */}
      {allCategories.map((cat) => {
        const product = productByCategory.get(cat);
        const imgs = product?.images || [];

        return (
          <TabsContent key={cat} value={cat} className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{cat}</h3>
              <Badge variant="secondary">{imgs.length} image(s)</Badge>
            </div>

            {imgs.length === 0 ? (
              <div className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground">
                No images in this category.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {imgs.map((src, idx) => (
                  <CloudTile
                    key={`${product._id}-${idx}`}
                    src={src}
                    alt={`${cat} ${idx + 1}`}
                    preload={idx === 0}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
