"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { slideInLeft, slideInRight, itemVariants, containerVariants } from "./motionVariants";

export default function StoryAndMission({ story, mission }) {
  const reduceMotion = useReducedMotion();

  const mv = (variants) =>
    reduceMotion
      ? { initial: false, whileInView: false }
      : {
          initial: "hidden",
          whileInView: "visible",
          variants,
          viewport: { once: true, amount: 0.25 },
        };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Story Card */}
          <motion.div
            {...mv(slideInLeft)}
            className="bg-gray-100 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {story.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              {story.description}
            </motion.p>
            <motion.ul variants={containerVariants} className="space-y-3 md:space-y-4">
              {story.points.map((point, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 text-amber-800 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="w-full h-full" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base group-hover:text-amber-800 transition-colors">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            {...mv(slideInRight)}
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-3xl border border-amber-200 shadow-sm hover:shadow-xl transition-shadow"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {mission.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              {mission.description}
            </motion.p>
            <motion.ul variants={containerVariants} className="space-y-3 md:space-y-4">
              {mission.points.map((point, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 text-amber-800 mr-3 mt-1 flex-shrink-0">
                    <CheckCircle className="w-full h-full" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base group-hover:text-amber-800 transition-colors">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}