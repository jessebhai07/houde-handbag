"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CldImage } from "next-cloudinary";
import {
  Factory,
  Globe2,
  ShieldCheck,
  Timer,
  ArrowRight,
  TableProperties,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import HomeCarousel from "@/components/HomeCarousel";
import TestimonialsCarousel from "@/components/Testimonials";

// your data
import { homeData, homeImages } from "@/lib/dictionary/homeData";
// reuse your about data for factory images + material list (still “your data”)
import { content as aboutContent } from "@/lib/dictionary/aboutData";
import TwoFactories from "@/app/about/TwoFactories";

/* ---------------- helpers ---------------- */
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

const toBase64 = (str) => {
  if (typeof window === "undefined") return Buffer.from(str).toString("base64");
  return window.btoa(str);
};

const shimmerDataUrl = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

// Cloudinary URL -> public_id (safe for next-cloudinary)
function cloudinaryPublicId(src) {
  if (!src) return src;
  if (!src.includes("/upload/")) return src;

  let after = src.split("/upload/")[1] || "";
  after = after.split("?")[0];

  const vIndex = after.search(/v\d+\//);
  if (vIndex >= 0) after = after.slice(vIndex);
  after = after.replace(/^v\d+\//, "");
  after = after.replace(/\.[a-z0-9]+$/i, "");
  return after;
}

/* ---------------- tiny building blocks ---------------- */
function SectionHeading({ title, subtitle, center = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({ title, value, unit }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 md:p-6 text-center hover:shadow-lg hover:scale-[1.01] transition">
      <div className="text-3xl sm:text-4xl font-extrabold text-amber-800">
        {value}
      </div>
      <div className="mt-2 text-sm sm:text-base font-semibold text-gray-900">
        {title}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">{unit}</div>
    </div>
  );
}

/* ---------------- main ---------------- */
export default function HomeClient() {
  const { lang } = useLanguage();
  const data = homeData?.[lang] ?? homeData.en;

  const about = aboutContent?.[lang] ?? aboutContent.en;

  const factoryImages = useMemo(() => {
    const items = about?.sections?.facilities?.items || [];
    const china = items.find((x) => /China|中国/i.test(x.label))?.image || null;
    const vietnam =
      items.find((x) => /Vietnam|越南/i.test(x.label))?.image || null;
    return { china, vietnam };
  }, [about]);

  // Materials (non-leather positioning)
  const nonLeatherBadges = useMemo(() => {
    const list = about?.sections?.materials?.materialsUsed || [];
    // keep it short & clean on home
    return list.slice(0, 6);
  }, [about]);

  // Use about capability numbers (your provided real numbers) + add “2 factories”
  const stats = useMemo(() => {
    const caps = about?.sections?.capabilities?.items || [];
    return [
      {
        title: lang === "en" ? "Factories" : "工厂",
        value: "3",
        unit: lang === "en" ? "China + Vietnam" : "中国 + 越南",
      },
      ...caps.map((x) => ({ title: x.title, value: x.value, unit: x.unit })),
    ].slice(0, 4); // keep grid tidy
  }, [about, lang]);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO (your carousel) */}
      <HomeCarousel />

      {/* Slim trust/position bar */}
      <div className="w-full bg-amber-800 border-b border-slate-200 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Side: Status / Info Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                  <Factory className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium ">
                  {lang === "en" ? "China + Vietnam Units" : "中越双生产基地"}
                </span>
              </div>

              <div className="h-4 w-[1px] bg-slate-300 hidden md:block" />

              <div className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                  <Globe2 className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium ">
                  {lang === "en" ? "OEM/ODM Global" : "OEM/ODM 全球供货"}
                </span>
              </div>
            </div>

            {/* Right Side: Trust & Speed Indicators */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-wider ">
                  {lang === "en" ? "Stable QC" : "稳定质控"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold uppercase tracking-wider ">
                  {lang === "en" ? "Fast Sampling" : "快速打样"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TWO FACTORIES (polished + clear) */}
      {/* <TwoFactories
        lang={lang}
        chinaImg={factoryImages.china}
        vietnamImg={factoryImages.vietnam}
      /> */}
      <TwoFactories />

      {/* CONTENT SECTIONS (your 3 sections + images) */}
      <div>
        {(data.sections || []).map((section, index) => (
          <ContentSection key={index} section={section} index={index} />
        ))}
      </div>

      {/* STATS (using your capabilities numbers + factories) */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={
              about?.sections?.capabilities?.title ||
              (lang === "en" ? "Manufacturing Strength" : "制造实力")
            }
            subtitle={
              about?.sections?.capabilities?.subtitle ||
              (lang === "en"
                ? "Stable capacity. Clear systems. Proven results."
                : "稳定产能 • 清晰系统 • 数据验证")
            }
          />
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
          
            ))}
          
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (your component) */}
      <TestimonialsCarousel />

      {/* PRODUCT CATEGORIES (your section) */}
      <ProductCategories lang={lang} data={data.productCategories} />

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 p-6 md:p-10 lg:p-12 text-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {lang === "en"
                    ? "Ready to build your next bag line?"
                    : "准备好打造您的下一条产品线了吗？"}
                </h3>
                <p className="mt-3 text-amber-100 text-sm sm:text-base md:text-lg">
                  {lang === "en"
                    ? "Share your requirements—we’ll support sampling, testing, and stable bulk production across China & Vietnam."
                    : "提交您的需求，我们将支持打样、测试与稳定量产（中国 + 越南双基地）。"}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-amber-800 px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-amber-50 transition w-full md:w-auto"
              >
                {lang === "en" ? "Start Your Project" : "开始合作"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- sections ---------------- */

function ContentSection({ section, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`py-12 sm:py-14 md:py-20 ${
        isEven ? "bg-white" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-start md:items-center gap-8 sm:gap-10 md:gap-12`}
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {section.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              {section.description}
            </p>

            <Link
              href="/business"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white font-semibold py-2.5 px-6 sm:px-7 transition w-full sm:w-auto"
            >
              {section.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            className="w-full md:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition">
              <div className="relative pb-[72%]">
                <CldImage
                  src={cloudinaryPublicId(homeImages.sectionImages[index])}
                  alt={section.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality="auto"
                  format="auto"
                  placeholder="blur"
                  blurDataURL={shimmerDataUrl(1200, 800)}
                  priority={index === 0}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TwoFactoriess({ lang, chinaImg, vietnamImg }) {
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
      img: chinaImg,
    },
    {
      key: "vietnam",
      name: lang === "en" ? "Vietnam Base" : "越南基地",
      desc:
        lang === "en"
          ? "Parallel production base with the same standards and processes — supports flexible planning and reliable global delivery with steady output."
          : "同标准、同工艺的协同产能基地：排产更灵活、产出更稳定，支持全球客户的可靠交付。",
      img: vietnamImg,
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

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

        <div className="mt-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white px-7 py-3 font-semibold transition"
          >
            {lang === "en"
              ? "Learn more about our factories"
              : "了解更多工厂信息"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCategories({ lang, data }) {
  if (!data) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={data.title}
          subtitle={
            lang === "en" ? "Explore series & styles" : "浏览系列与款式"
          }
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.categories.map((category, index) => (
            <div
              key={index}
              className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative aspect-[4/3] bg-gray-50">
                <CldImage
                  src={cloudinaryPublicId(homeImages.categoryImages[index])}
                  alt={category.name}
                  fill
                  className="object-contain p-4 group-hover:scale-[1.02] transition-transform"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  quality="auto"
                  format="auto"
                  placeholder="blur"
                  blurDataURL={shimmerDataUrl(1200, 800)}
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900">{category.name}</p>
                {category.count ? (
                  <p className="text-sm text-gray-600 mt-1">{category.count}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
