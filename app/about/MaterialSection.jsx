"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Package, CheckCircle } from "lucide-react";
import { scaleIn } from "./motionVariants";

export default function MaterialsSection({ data }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            variants={reduceMotion ? undefined : scaleIn}
            className="lg:col-span-2 bg-gray-100 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-amber-800" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{data.rangeTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {data.productRange.map((x, i) => (
                <span key={i} className="rounded-full bg-white px-3 py-1 text-xs sm:text-sm border text-gray-800">{x}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-amber-800" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{data.materialTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.materialsUsed.map((x, i) => (
                <span key={i} className="rounded-full bg-amber-50 px-3 py-1 text-xs sm:text-sm border border-amber-100 text-gray-800">{x}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={reduceMotion ? false : "hidden"}
             whileInView={reduceMotion ? undefined : "visible"}
             variants={reduceMotion ? undefined : scaleIn}
             className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 md:p-8 border border-amber-200 shadow-sm"
          >
             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{data.systemTitle}</h3>
             <div className="space-y-3">
                {data.systems.map((x, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-800 mt-0.5" />
                    <p className="text-gray-700 text-sm sm:text-base">{x}</p>
                  </div>
                ))}
             </div>
             <div className="mt-6 rounded-xl bg-white/70 border p-4">
                <p className="text-sm sm:text-base text-gray-800 font-semibold">{data.certificationTitle}</p>
                <p className="text-sm text-gray-600 mt-1">{data.certificationDesc}</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}