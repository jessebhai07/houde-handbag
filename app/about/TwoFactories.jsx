"use client";

import { useMemo } from "react";
import { CldImage } from "next-cloudinary";
import { Factory, MapPin, ShieldCheck, Globe2, Zap, Layers } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { content as aboutContent } from "@/lib/dictionary/aboutData";

/* -------------------------------------------------------------------------- */
/* UTILS (Keep existing utils) */
/* -------------------------------------------------------------------------- */
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f3f4f6" offset="0%" />
      <stop stop-color="#e5e7eb" offset="50%" />
      <stop stop-color="#f3f4f6" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f4f6"/>
  <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>
`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmerDataUrl = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

function cloudinaryPublicId(src) {
  if (!src) return "";
  if (!src.includes("/upload/")) return src;
  let after = src.split("/upload/")[1] || "";
  after = after.split("?")[0];
  const vIndex = after.search(/v\d+\//);
  if (vIndex >= 0) after = after.slice(vIndex);
  after = after.replace(/^v\d+\//, "");
  after = after.replace(/\.[a-z0-9]+$/i, "");
  return after;
}

/* -------------------------------------------------------------------------- */
/* COMPONENT */
/* -------------------------------------------------------------------------- */
export default function TwoFactories() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // 1. Get Data
  const about = aboutContent?.[lang] ?? aboutContent.en;

  // 2. Extract Images
  const factoryImages = useMemo(() => {
    const items = about?.sections?.facilities?.items || [];
    const china = items.find((x) => /China|中国/i.test(x.label))?.image || null;
    const vietnam = items.find((x) => /Vietnam|越南/i.test(x.label))?.image || null;
    return { china, vietnam };
  }, [about]);

  // 3. Define Content
  const content = {
    title: isEn ? "Global Manufacturing Footprint" : "全球制造布局",
    subtitle: isEn
      ? "Dual-base strategy ensuring flexible capacity, risk mitigation, and unified quality."
      : "双基地战略确保灵活的产能、风险规避以及统一的质量标准。",
    bridgeText: isEn ? "Unified Quality Standard (ISO 9001)" : "统一质量标准 (ISO 9001)",
    bases: [
      {
        id: "china",
        country: isEn ? "China Base" : "中国基地",
        location: isEn ? "Dongguan, Guangdong" : "广东东莞",
        role: isEn ? "Headquarters & R&D" : "总部与研发中心",
        desc: isEn 
          ? "Our core facility for complex designs, rapid prototyping, and material sourcing. Handles high-end manufacturing and technical development."
          : "负责复杂设计、快速打样和材料采购的核心设施。处理高端制造和技术开发。",
        img: factoryImages.china,
        features: isEn 
          ? ["Rapid Sampling", "Complex Craftsmanship", "Material Hub"]
          : ["快速打样", "复杂工艺", "材料中心"]
      },
      {
        id: "vietnam",
        country: isEn ? "Vietnam Base" : "越南基地",
        location: isEn ? "Binh Duong,Vietnam" : "Binh Duong,越南",
        role: isEn ? "Volume Production" : "大批量生产基地",
        desc: isEn
          ? "Specialized in large-scale production runs with competitive labor costs and tariff advantages for specific international markets."
          : "专注于具有竞争力的劳动力成本和针对特定国际市场的关税优势的大规模生产。",
        img: factoryImages.vietnam,
        features: isEn 
          ? ["High Capacity", "Cost Efficient", "Tariff Benefits"]
          : ["高产能", "成本效益", "关税优势"]
      }
    ]
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
         <Globe2 className="absolute -right-20 -top-20 w-[500px] h-[500px] text-slate-900" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-sm font-semibold mb-4">
             <Globe2 className="w-4 h-4" />
             {isEn ? "Strategic Locations" : "战略布局"}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* The Factory Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Central "Bridge" Badge (Desktop Only) */}
          <div className="hidden lg:flex absolute left-1/2 top-12 -translate-x-1/2 z-20 flex-col items-center justify-center">
            <div className="bg-white border-2 border-green-200 shadow-xl rounded-full p-2">
                <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>
            <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-slate-100 shadow-sm text-xs font-bold text-slate-700 whitespace-nowrap">
                {content.bridgeText}
            </div>
          </div>

          {content.bases.map((base, idx) => (
            <div 
              key={base.id} 
              className={`
                group relative flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                ${idx === 0 ? 'lg:mr-4' : 'lg:ml-4'} 
              `}
            >
              {/* Image Section */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden bg-slate-100">
                 {base.img ? (
                   <CldImage
                     src={cloudinaryPublicId(base.img)}
                     alt={base.country}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                     <Factory className="w-16 h-16" />
                   </div>
                 )}
                 
                 {/* Map Pin Label */}
                 <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${base.id === 'china' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{base.country}</p>
                        <p className="text-sm font-bold text-slate-900 leading-none">{base.location}</p>
                    </div>
                 </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8">
                <div className="flex items-center gap-2 mb-4">
                    {base.id === 'china' ? <Zap className="w-5 h-5 text-amber-600"/> : <Layers className="w-5 h-5 text-amber-600"/>}
                    <span className="text-amber-700 font-bold text-sm uppercase tracking-wide">
                        {base.role}
                    </span>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-8 min-h-[80px]">
                    {base.desc}
                </p>

                {/* Features List */}
                <div className="border-t border-slate-100 pt-6">
                    <ul className="space-y-3">
                        {base.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-slate-700 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}