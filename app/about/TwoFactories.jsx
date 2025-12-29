"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Factory, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider"; // Ensure path is correct
import { content as aboutContent } from "@/lib/dictionary/aboutData"; // Ensure path is correct

/* -------------------------------------------------------------------------- */
/* HELPERS                                  */
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
/* MAIN COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function TwoFactories() {
  const { lang } = useLanguage();

  // 1. Get About Data based on current language
  const about = aboutContent?.[lang] ?? aboutContent.en;

  // 2. Extract China/Vietnam images internally
  const factoryImages = useMemo(() => {
    const items = about?.sections?.facilities?.items || [];
    const china = items.find((x) => /China|中国/i.test(x.label))?.image || null;
    const vietnam = items.find((x) => /Vietnam|越南/i.test(x.label))?.image || null;
    return { china, vietnam };
  }, [about]);

  // 3. Define text constants
  const title = lang === "en" ? "Two Production Bases" : "两大生产基地";
  const subtitle =
    lang === "en"
      ? "Same OEM/ODM services, unified quality system — delivered from China & Vietnam for flexible capacity and stable lead time."
      : "同一 OEM/ODM 服务，同一质量体系——中国 + 越南双基地协同，产能更灵活、交期更稳定。";

  const cards = [
    {
      key: "china",
      name: lang === "en" ? "China Base" : "中国基地",
      desc:
        lang === "en"
          ? "Core manufacturing base running under unified SOPs: sampling & development, bulk production, and strict in-line + final QC for consistent quality."
          : "核心制造基地，统一 SOP 运行：打样与开发、量产执行、过程检验 + 出货终检，确保品质一致稳定。",
      img: factoryImages.china,
    },
    {
      key: "vietnam",
      name: lang === "en" ? "Vietnam Base" : "越南基地",
      desc:
        lang === "en"
          ? "Parallel production base with the same standards and processes — supports flexible planning and reliable global delivery with steady output."
          : "同标准、同工艺的协同产能基地：排产更灵活、产出更稳定，支持全球客户的可靠交付。",
      img: factoryImages.vietnam,
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {cards.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative aspect-[16/9] bg-gray-100">
                {c.img ? (
                  <CldImage
                    src={cloudinaryPublicId(c.img)}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality="auto"
                    format="auto"
                    placeholder="blur"
                    blurDataURL={shimmerDataUrl(1200, 800)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Factory className="h-10 w-10 text-amber-800" />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                {/* Card Tags (Bottom Left) */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                    <Factory className="h-4 w-4 text-amber-800" />
                    {c.name}
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900">
                      {lang === "en" ? "Same services" : "同服务"}
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900">
                      {lang === "en" ? "Same QC" : "同质控"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {c.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-semibold text-gray-800">
                    OEM/ODM
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-semibold text-gray-800">
                    {lang === "en" ? "Unified SOP" : "统一SOP"}
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-semibold text-gray-800">
                    {lang === "en" ? "Consistent QC" : "一致质检"}
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-semibold text-gray-800">
                    {lang === "en" ? "Stable lead time" : "稳定交期"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white px-7 py-3 font-semibold transition"
          >
            {lang === "en"
              ? "Learn more about our factories"
              : "了解更多工厂信息"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}