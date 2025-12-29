"use client";

import { useEffect, useMemo, useState } from "react";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";

// --- Types (Optional if using TS) ---

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

// --- Helper: Shuffle Array (Fisher-Yates) ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Component: Single Image Tile ---
function CloudTile({ src, alt, category, className, priority = false }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            "group relative cursor-zoom-in overflow-hidden rounded-xl border bg-neutral-100 dark:bg-neutral-900 shadow-sm",
            className
          )}
        >
          {/* Image */}
          <div className="relative w-full h-auto">
            <CldImage
              src={src}
              alt={alt}
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
            {category && (
              <span className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                {category}
              </span>
            )}
            <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2" />
          </div>
        </motion.div>
      </DialogTrigger>

      {/* Modal View */}
      <DialogContent className="max-w-fit bg-white w-full border-none shadow-none p-4 flex flex-col items-center justify-center gap-0 overflow-hidden">
        {/* ACCESSIBILITY NOTE: 
     Radix UI requires a DialogTitle for screen readers. 
     We hide it visually but keep it for DOM structure.
  */}
        <DialogTitle className="sr-only">Image Preview</DialogTitle>

        {/* CLOSE BUTTON ROW
      Positioned relative to the image container or fixed at top-right.
      Using DialogClose here ensures clicking it always closes the modal.
  */}

        {/* IMAGE CONTAINER 
      1. We removed onClick={(e) => e.stopPropagation()}. 
         Now, clicking the empty space around the image (the overlay) will close it naturally.
      2. The image handles its own aspect ratio.
  */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
          <CldImage
            src={src}
            alt={alt}
            width={1400}
            height={1400}
            className="h-auto w-auto max-h-[80vh] max-w-[90vw] object-contain"
            sizes="90vw"
            priority
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

  // State for shuffled images to prevent hydration mismatch
  const [shuffledAll, setShuffledAll] = useState([]);

  // 1. Fetch Data
  useEffect(() => {
    const fetchPublicProducts = async () => {
      setFetching(true);
      try {
        const res = await fetch("/api/products/public", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load");

        setProducts(data.products || []);
        if (data.categories?.length) setCategories(data.categories);
      } catch (e) {
        console.error("Gallery Error:", e);
      } finally {
        setFetching(false);
      }
    };
    fetchPublicProducts();
  }, []);

  // 2. Memoized Data Processing
  const productByCategory = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.category, p));
    return map;
  }, [products]);

  const allCategories = useMemo(() => {
    const fromProducts = products.map((p) => p.category).filter(Boolean);
    return Array.from(new Set([...categories, ...fromProducts]));
  }, [categories, products]);

  // 3. Flatten All Images for the "All" Tab
  const allFlatImages = useMemo(() => {
    const images = [];
    allCategories.forEach((cat) => {
      const product = productByCategory.get(cat);
      if (product?.images) {
        product.images.forEach((src, idx) => {
          images.push({
            id: `${product._id}-${idx}`,
            src,
            category: cat,
            alt: `${cat} View ${idx + 1}`,
          });
        });
      }
    });
    return images;
  }, [allCategories, productByCategory]);

  // 4. Shuffle Effect (Client-side only)
  useEffect(() => {
    setShuffledAll(shuffleArray(allFlatImages));
  }, [allFlatImages]);

  // 5. Loading State
  if (fetching) {
    return (
      <div className="w-full space-y-6">
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-64 rounded-xl break-inside-avoid"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Scrollable Tabs List */}
        {/* Replaced ScrollArea with a Grid Layout */}
        <div className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="w-full border bg-background hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              All Products
            </TabsTrigger>

            {allCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="w-full border bg-background hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* --- TAB: ALL (Masonry Layout) --- */}
        <TabsContent value="all" className="mt-6 min-h-[50vh]">
          {shuffledAll.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No images found.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {shuffledAll.map((item, idx) => (
                <div key={item.id} className="break-inside-avoid">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <CloudTile
                      src={item.src}
                      alt={item.alt}
                      category={item.category}
                      priority={idx < 8} // Preload top items
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* --- TAB: SPECIFIC CATEGORY (Grid Layout) --- */}
        {allCategories.map((cat) => {
          const product = productByCategory.get(cat);
          const imgs = product?.images || [];

          return (
            <TabsContent
              key={cat}
              value={cat}
              className="mt-6 space-y-6 min-h-[50vh]"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold tracking-tight">{cat}</h3>
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  {imgs.length} Items
                </Badge>
              </div>

              {imgs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  <p>No images available for {cat}</p>
                </div>
              ) : (
                // Using Grid here because strictly categorized items look better organized
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imgs.map((src, idx) => (
                    <motion.div
                      key={`${product._id}-${idx}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <CloudTile
                        src={src}
                        alt={`${cat} ${idx + 1}`}
                        // category={cat} // Optional: hide category name in grid view since tab is active
                        priority={idx < 6}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
