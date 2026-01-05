"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; 
import { galleryData } from "../gallery/gallery";


const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-background">
      <CardContent className="p-0">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          {/* Skeleton displays only while image is loading */}
          {isLoading && (
            <Skeleton className="absolute inset-0 z-10 w-full h-full animate-pulse" />
          )}

          <Image
            src={product.url}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500 ease-in-out group-hover:scale-105",
              isLoading
                ? "scale-110 blur-xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoad={() => setIsLoading(false)}
            // Performance: Load smaller images for mobile
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
          />

          {/* Overlay Text (Optional Style) */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-medium text-sm">{product.name}</p>
          </div>
        </div>

        {/* Standard Text Below */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-foreground truncate">
            {product.name}
          </h3>
          {/* <p className="text-xs text-muted-foreground">ID: {product.id}</p> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ProductGalleryPage() {
  // 1. Extract Categories dynamically
  const categories = useMemo(() => {
    const uniqueCategories = new Set(galleryData.map((item) => item.name));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  // 2. State for active tab
  const [activeCategory, setActiveCategory] = useState("All");

  // 3. Filter Data
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return galleryData;
    return galleryData.filter((item) => item.name === activeCategory);
  }, [activeCategory]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Product Collection
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our curated gallery of premium bags and accessories.
        </p>
      </div>

      <Tabs
        defaultValue="All"
        className="w-full space-y-8"
        onValueChange={setActiveCategory}
      >
        <div className=" justify-center px-4 h-40">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-muted/20 p-2 rounded-lg w-full">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="
                shrink-0 
                px-4 py-2.5 rounded-md
                 font-medium transition-all duration-200
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                data-[state=active]:shadow-md data-[state=active]:scale-[1.02]
                border border-transparent 
                data-[state=inactive]:border-border/40 data-[state=inactive]:hover:bg-muted/30
                data-[state=inactive]:hover:border-border/60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                min-w-24
                whitespace-nowrap overflow-hidden text-ellipsis
                "
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-h-[500px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </Tabs>
    </section>
  );
}
