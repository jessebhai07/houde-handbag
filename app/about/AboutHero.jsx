"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { containerVariants, itemVariants } from "./motionVariants";

export default function AboutHero({ content, lang }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-amber-100 py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            variants={reduceMotion ? undefined : containerVariants}
            className="space-y-4 md:space-y-6"
          >
            <motion.div variants={itemVariants}>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-800/90">
                <span className="h-2 w-2 rounded-full bg-amber-700" />
                {lang === "en" ? "Company Overview" : "公司介绍"}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                {content.title}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-amber-800 font-semibold">
                {content.subtitle}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                {content.heroDescription}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-amber-800 px-6 py-3 text-sm md:text-base font-semibold text-white hover:bg-amber-700 transition shadow-sm hover:shadow-md"
              >
                {lang === "en" ? "Contact Us" : "联系我们"}
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-6 py-3 text-sm md:text-base font-semibold text-amber-900 hover:bg-amber-50 transition"
              >
                {lang === "en" ? "View Products" : "查看产品"}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -3 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.8, type: "spring", stiffness: 90, damping: 14 }
            }
            className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl lg:rounded-3xl overflow-hidden border border-amber-200/60 bg-white shadow-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800" />
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <CldImage
                src="https://res.cloudinary.com/drnascc38/image/upload/v1766143823/Picsart_25-12-19_19-29-08-105_cv6vbp.png"
                alt="hero"
                width={1600}
                height={2200}
                className="h-full w-full object-contain rounded-xl bg-white shadow-lg"
                sizes="(max-width: 768px) 92vw, 1000px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}