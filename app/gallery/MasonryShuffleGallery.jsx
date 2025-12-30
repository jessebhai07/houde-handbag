"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 1. Define your type


// 2. The Shuffle Utility (Fisher-Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


export const MasonryShuffleGallery = ({ items }) => {
  const [shuffledItems, setShuffledItems] = useState([]);

  // 3. Shuffle on Mount (prevents hydration errors)
  useEffect(() => {
    setShuffledItems(shuffleArray(items));
  }, [items]);

  // Prevent flash of empty content or hydration mismatch
  if (shuffledItems.length === 0) return null;

  return (
    <div className="p-4 md:p-8">
      {/* Masonry Layout using Tailwind Columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        
        {shuffledItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative group break-inside-avoid overflow-hidden rounded-xl bg-neutral-900"
          >
            <Image
              src={item.url}
              alt={item.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-medium text-lg tracking-wide border border-white/20 bg-white/10 px-4 py-2 rounded-full">
                {item.name}
              </span>
              {/* <span className="text-white font-medium text-lg tracking-wide border border-white/20 bg-white/10 px-4 py-2 rounded-full">
                {item.id}
              </span> */}
            </div>
          </motion.div>
        ))}
        
      </div>
    </div>
  );
};