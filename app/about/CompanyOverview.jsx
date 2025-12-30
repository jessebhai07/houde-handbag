"use client";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { itemVariants } from "./motionVariants";

export default function CompanyOverview({ companies }) {
  if (!companies?.items || companies.items.length < 2) return null;

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto lg:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
        className="pt-2"
      >
        <div className="rounded-2xl border border-amber-200/70 bg-white/70 backdrop-blur px-4 py-4 md:px-5 md:py-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 border border-amber-200">
              <Building2 className="h-4 w-4 text-amber-800" />
            </span>
            <span>{companies.eyebrow}</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {companies.items.slice(0, 2).map((co, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-gray-50 transition"
              >
                <p className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                  {co.name}
                </p>
                <p className="mt-1 inline-flex w-fit rounded-full bg-amber-50 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-amber-900 border border-amber-100">
                  {co.role}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {co.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}