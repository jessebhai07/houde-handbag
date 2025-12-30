"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { ShieldCheck, CheckCircle, Settings, Factory, Package } from "lucide-react";
import { slideInLeft, slideInRight } from "./motionVariants";

export default function InternalTesting({ data }) {
  const reduceMotion = useReducedMotion();
  const mv = (variants) => reduceMotion ? {} : { initial: "hidden", whileInView: "visible", variants, viewport: { once: true } };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left Column */}
          <motion.div {...mv(slideInLeft)} className="bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-amber-800" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{data.subTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{data.shortLine}</p>
            <div className="mt-5 space-y-3">
              {data.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-amber-800" />
                  <p className="text-gray-700 text-sm sm:text-base">{h}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl overflow-hidden border border-amber-100 bg-gray-50">
              <CldImage src={data.machineImage} alt="Testing machine" width={1200} height={900} className="w-full h-56 sm:h-64 object-cover" />
            </div>
          </motion.div>

          {/* Right Column (Table) */}
          <motion.div {...mv(slideInRight)} className="bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-amber-800" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{data.tableTitle}</h3>
            </div>
            <div className="w-full max-w-full overflow-x-auto rounded-xl border border-amber-100 bg-white">
              <table className="w-full table-fixed text-left">
                <thead className="bg-amber-50">
                  <tr>
                    {data.tableHeaders.map((h, i) => <th key={i} className="py-3 px-3 text-sm font-semibold text-gray-900">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.tests.map((row, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="py-3 px-3 text-sm text-gray-700">{row.no}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{row.item}</td>
                      <td className="py-3 px-3 text-sm text-gray-700">{row.equipment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="h-4 w-4 text-amber-800" />
                    <p className="font-semibold text-gray-900 text-sm">{data.badge1Title}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{data.badge1Desc}</p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-amber-800" />
                    <p className="font-semibold text-gray-900 text-sm">{data.badge2Title}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{data.badge2Desc}</p>
                </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}