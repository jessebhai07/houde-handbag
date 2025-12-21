"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ImageTile from "./ImageTile";

export default function CategoriesTabs({
  categories,
  products,
  fetching,
  activeTab,
  setActiveTab,
  onDeleteImage,
}) {
  const productByCategory = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => map.set(p.category, p));
    return map;
  }, [products]);

  const allCategories = useMemo(() => {
    // show preset categories even if empty
    const merged = Array.from(new Set([...(categories || []), ...(products || []).map((p) => p.category)]));
    return merged;
  }, [categories, products]);

  if (fetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[340px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
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
      </div>

      <TabsContent value="all" className="mt-6 space-y-10">
        {allCategories.map((cat) => {
          const product = productByCategory.get(cat);
          const imgs = product?.images || [];
          return (
            <section key={cat} className="space-y-4">
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
                    <ImageTile
                      key={`${product._id}-${idx}`}
                      src={src}
                      alt={`${cat} ${idx + 1}`}
                      onDelete={() => onDeleteImage(product._id, src)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </TabsContent>

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
                  <ImageTile
                    key={`${product._id}-${idx}`}
                    src={src}
                    alt={`${cat} ${idx + 1}`}
                    onDelete={() => onDeleteImage(product._id, src)}
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
