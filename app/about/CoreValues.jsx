"use client";
import { motion, useReducedMotion } from "framer-motion";
import { scaleIn } from "./motionVariants";

export default function CoreValues({ data, lang }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-amber-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3 md:mb-4">
            {data.title}
          </h2>
          <p className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            {lang === "en" ? "The principles that guide everything we do" : "指导我们一切行动的原则"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {data.items.map((value, index) => (
            <motion.div
              key={index}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              variants={reduceMotion ? undefined : scaleIn}
              transition={reduceMotion ? undefined : { duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.12 }}
              className="bg-gray-100 p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="text-amber-800 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-amber-800 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}