"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Factory, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageProvider";
import { content as aboutContent } from "@/lib/dictionary/aboutData";
import { CldImage } from "next-cloudinary";

/* -------------------------------------------------------------------------- */
/* SHIMMER PLACEHOLDER */
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
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

const shimmerDataUrl = (w, h) => `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

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
/* MAIN COMPONENT - UPDATED WITH PROFESSIONAL DESCRIPTIONS */
/* -------------------------------------------------------------------------- */
export default function BagFactoriesMachinery() {
  const { lang } = useLanguage();

  const t = useMemo(() => ({
    heroTitle: lang === "en" ? "Advanced Machinery in Our Bag Factories" : "我们袋类工厂的先进设备",
    heroSubtitle: lang === "en" 
      ? "From high-speed automated lines for plastic & non-woven bags to precision tools for leather handbags — powered by unified quality systems across our China & Vietnam bases."
      : "从塑料与无纺布袋的高速自动化生产线，到皮革手袋的精密设备——中国与越南双基地统一质量体系保障。",
    sectionFactories: lang === "en" ? "Our Two Production Bases" : "两大生产基地",
    factoriesDesc: lang === "en"
      ? "Same OEM/ODM services, unified quality system — delivered from China & Vietnam for flexible capacity and stable lead time."
      : "同一 OEM/ODM 服务，同一质量体系——中国 + 越南双基地协同，产能更灵活、交期更稳定。",
    
    chinaName: lang === "en" ? "China Base" : "中国基地",
    chinaDesc: lang === "en"
      ? "Our primary manufacturing hub in mainland China serves as the cornerstone of innovation and large-scale production. Equipped with state-of-the-art automated lines for plastic extrusion, non-woven ultrasonic sealing, high-speed printing, and precision bag-making, this facility excels in handling complex OEM/ODM projects with efficient material sourcing and rapid prototyping. Operating under unified SOPs and rigorous in-line/final QC protocols, it ensures consistent premium quality while supporting high-volume output for global clients."
      : "我们在中国大陆的核心制造中心是创新与大规模生产的基石。配备先进的塑料挤出、无纺布超声波密封、高速印刷和精密制袋自动化生产线，该基地擅长处理复杂的OEM/ODM项目，具有高效的材料采购和快速打样能力。在统一SOP和严格的过程+出货质检流程下运行，确保品质一致稳定，同时支持全球客户的大批量产出。",
    
    vietnamName: lang === "en" ? "Vietnam Base" : "越南基地",
    vietnamDesc: lang === "en"
      ? "Our parallel production facility in Vietnam mirrors the same high standards, processes, and quality systems as our China operations. Specializing in labor-intensive craftsmanship, eco-friendly materials, and flexible mid-to-high volume runs, it enhances supply chain resilience and cost optimization. This base enables agile scheduling, stable lead times, and seamless global delivery—ideal for diversified sourcing strategies and meeting evolving international trade requirements."
      : "我们的越南平行生产基地采用与中国完全相同的标准、工艺和质量体系。专注于劳动密集型精湛工艺、环保材料以及灵活的中高产量，该基地提升了供应链韧性和成本优化。它实现敏捷排产、稳定交期以及无缝全球交付——适合多元化采购策略并应对不断变化的国际贸易需求。",
    
    dualSummary: lang === "en"
      ? "Together, these dual bases provide unified OEM/ODM services, identical quality assurance, flexible capacity allocation, and reliable performance across plastic, non-woven, paper, and fashion bag categories."
      : "双基地协同提供统一的OEM/ODM服务、一致的品质保障、灵活的产能调配，以及在塑料、无纺布、纸袋和时尚手袋品类中的可靠表现。",
    
    sectionMachinery: lang === "en" ? "Key Machinery Categories" : "主要设备分类",
    plasticTitle: lang === "en" ? "Plastic Bag Production" : "塑料袋生产",
    plasticDesc: lang === "en" ? "High-speed automated lines for PE shopping, garbage, and T-shirt bags." : "高速自动化生产线，用于PE购物袋、垃圾袋、背心袋。",
    nonwovenTitle: lang === "en" ? "Non-Woven Eco Bag Production" : "无纺布环保袋生产",
    nonwovenDesc: lang === "en" ? "Ultrasonic sealing for reusable shopping bags – sustainable & durable." : "超声波密封技术，生产可重复使用的环保购物袋——可持续且耐用。",
    paperTitle: lang === "en" ? "Paper Bag Production" : "纸袋生产",
    paperDesc: lang === "en" ? "Square-bottom machines for grocery and retail paper bags." : "方底机，用于杂货及零售纸袋生产。",
    leatherTitle: lang === "en" ? "Leather / Fashion Handbag Production" : "皮革/时尚手袋生产",
    leatherDesc: lang === "en" ? "Precision cutting, heavy-duty sewing, and finishing tools." : "精密切割、重载缝纫及表面处理设备。",
    footerNote: lang === "en"
      ? "All production lines include auxiliary equipment: rewinders, stackers, and advanced QC systems."
      : "所有生产线配备辅助设备：收卷机、堆垛机及先进质检系统。",
  }), [lang]);

  // Extract factory images
  const factoryImages = useMemo(() => {
    const items = aboutContent?.[lang]?.sections?.facilities?.items || aboutContent.en.sections.facilities.items;
    const china = items.find((x) => /China|中国/i.test(x.label))?.image || null;
    const vietnam = items.find((x) => /Vietnam|越南/i.test(x.label))?.image || null;
    return { china, vietnam };
  }, [lang]);

  const factoryCards = [
    { key: "china", name: t.chinaName, desc: t.chinaDesc, img: factoryImages.china },
    { key: "vietnam", name: t.vietnamName, desc: t.vietnamDesc, img: factoryImages.vietnam },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            {t.heroTitle}
          </motion.h1>
          <p className="mt-6 max-w-4xl mx-auto text-lg md:text-xl opacity-90">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Factories Section - Updated with Professional Descriptions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectionFactories}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t.factoriesDesc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {factoryCards.map((c) => (
              <Card key={c.key} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-[16/9]">
                  {c.img ? (
                    <CldImage
                      src={cloudinaryPublicId(c.img)}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality="auto"
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl(1200, 800)}
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-200 h-full">
                      <Factory className="h-20 w-20 text-amber-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute bottom-6 left-6 text-xl px-5 py-3 bg-white/95 text-gray-900 shadow-lg">
                    <Factory className="mr-3 h-6 w-6" /> {c.name}
                  </Badge>
                </div>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed text-base">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dual Bases Summary */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 italic">{t.dualSummary}</p>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Machinery Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectionMachinery}</h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Plastic */}
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <CardTitle className="text-2xl">{t.plasticTitle}</CardTitle>
                <CardDescription className="text-indigo-100">{t.plasticDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="film">
                    <AccordionTrigger>Film Blowing Machine (Blown Film Extruder)</AccordionTrigger>
                    <AccordionContent>Melts PE resin, extrudes and inflates tubular film – base material for all plastic bags.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bag">
                    <AccordionTrigger>Bag Making Machine</AccordionTrigger>
                    <AccordionContent>Heat seals, cuts, punches handles – produces T-shirt, bottom-seal, roll bags.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="print">
                    <AccordionTrigger>Flexo Printing Machine</AccordionTrigger>
                    <AccordionContent>Prints logos/designs on film rolls before bag formation.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                </div>
              </CardContent>
            </Card>

            {/* Non-Woven */}
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                <CardTitle className="text-2xl">{t.nonwovenTitle}</CardTitle>
                <CardDescription className="text-emerald-100">{t.nonwovenDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible defaultValue="main">
                  <AccordionItem value="main">
                    <AccordionTrigger>Non-Woven Bag Making Machine</AccordionTrigger>
                    <AccordionContent>Ultrasonic/heat sealing, gusset folding, handle attachment – high-speed eco bag production (up to 220 bags/min).</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                </div>
              </CardContent>
            </Card>

            {/* Paper */}
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-amber-700 text-white">
                <CardTitle className="text-2xl">{t.paperTitle}</CardTitle>
                <CardDescription className="text-amber-100">{t.paperDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="main">
                    <AccordionTrigger>Paper Bag Making Machine</AccordionTrigger>
                    <AccordionContent>Forms tubes, glues bottoms/gussets, adds handles – for food-grade & retail bags.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                </div>
              </CardContent>
            </Card>

            {/* Leather */}
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-700 text-white">
                <CardTitle className="text-2xl">{t.leatherTitle}</CardTitle>
                <CardDescription className="text-pink-100">{t.leatherDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="cut">
                    <AccordionTrigger>Cutting / Skiving Machine</AccordionTrigger>
                    <AccordionContent>Precise leather panel cutting and edge thinning.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sew">
                    <AccordionTrigger>Heavy-Duty Walking Foot Sewing Machine</AccordionTrigger>
                    <AccordionContent>Stitches thick leather layers and attaches hardware.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="emboss">
                    <AccordionTrigger>Embossing / Creasing Machine</AccordionTrigger>
                    <AccordionContent>Adds patterns, logos, and structural folds.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="bg-slate-900 py-12 text-center text-white">
        <p className="text-lg max-w-4xl mx-auto px-6">
          {t.footerNote}
        </p>
      </footer>
    </>
  );
}