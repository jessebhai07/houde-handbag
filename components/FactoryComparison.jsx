"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import {
  Factory,
  MapPin,
  Users,
  Building,
  Package,
  TrendingUp,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className="h-5 w-5" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </div>
    </div>
  );
}

function PillList({ items, className }) {
  return (
    <div className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item, idx) => (
        <span
          key={`${item}-${idx}`}
          className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function AdvantageList({ items, accentClass = "text-gray-700", dotClass = "bg-gray-900" }) {
  return (
    <ul className="space-y-2">
      {items.map((adv, idx) => (
        <li key={`${adv}-${idx}`} className="flex items-start gap-2.5">
          <span className={cx("mt-2 h-2 w-2 shrink-0 rounded-full", dotClass)} />
          <span className={cx("text-sm md:text-base leading-relaxed", accentClass)}>{adv}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FactoryComparison() {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const data = {
    en: {
      title: "Our Manufacturing Facilities",
      subtitle: "Strategic locations built for quality, speed, and scale.",
      factories: {
        china: {
          name: "Chinese Factory",
          location: "Dongguan, China",
          established: "2014",
          employees: "180+",
          area: "10,000 m²",
          products: ["Tool bag", "Hay collection bag", "Cosmetic bag", "Backpack", "Game case", "EVA CASE"],
          advantages: ["Development & design", "High capacity & efficiency", "Complete supply chain integration"],
          description: "Our flagship facility specializes in complex designs and premium quality production.",
        },
        vietnam: {
          name: "Vietnam Factory",
          location: "Binh Duong, Vietnam",
          established: "2014",
          employees: "180+",
          area: "5,000 m²",
          products: ["Tool bag", "Hay collection bag", "Cosmetic bag", "Backpack", "Game case", "EVA CASE"],
          advantages: ["Lower production cost", "Tariff advantages", "Fast delivery across ASEAN markets"],
          description: "Cost-effective production with strong regional trade advantages.",
        },
      },
      metrics: {
        established: "Established",
        employees: "Employees",
        area: "Covered Area",
        products: "Products",
        advantages: "Advantages",
        compare: "Facility Comparison",
        feature: "Feature",
        primaryAdv: "Primary Advantages",
        summaryTitle: "Quick Comparison",
        note:
          "Both facilities work in synergy to provide flexible, cost-effective solutions for clients worldwide.",
      },
    },
    zh: {
      title: "我们的生产基地",
      subtitle: "战略布局，兼顾品质、效率与规模化交付。",
      factories: {
        china: {
          name: "中国工厂",
          location: "中国东莞",
          established: "2014年",
          employees: "180+",
          area: "10,000 平方米",
          products: ["工具包", "收纳包", "化妆包", "背包", "游戏箱", "EVA箱"],
          advantages: ["开发与设计", "生产能力与效率", "完整供应链整合"],
          description: "我们的旗舰工厂专注于复杂设计与高品质生产。",
        },
        vietnam: {
          name: "越南工厂",
          location: "越南平阳省",
          established: "2014年",
          employees: "180+",
          area: "5,000 平方米",
          products: ["工具包", "收纳包", "化妆包", "背包", "游戏箱", "EVA箱"],
          advantages: ["低成本生产", "关税优势", "快速交付东盟市场"],
          description: "成本效益高，具备区域贸易协定优势与交付效率。",
        },
      },
      metrics: {
        established: "成立时间",
        employees: "员工人数",
        area: "占地面积",
        products: "产品范围",
        advantages: "优势特点",
        compare: "设施对比",
        feature: "特性",
        primaryAdv: "主要优势",
        summaryTitle: "快速对比",
        note: "两大生产基地协同运作，为全球客户提供灵活且具成本效益的解决方案。",
      },
    },
  };

  const current = data[lang] ?? data.en;

  const factories = useMemo(() => {
    return [
      {
        key: "china",
        ...current.factories.china,
        accent: "red",
        headerIcon: TrendingUp,
        badgeBg: "bg-red-100 text-red-800",
        iconWrap: "bg-red-50",
        iconColor: "text-red-600",
        pillBg: "bg-red-50 text-red-700 border-red-100",
        dot: "bg-red-500",
        border: "border-red-100",
        glow: "from-red-500/15 via-amber-500/10 to-transparent",
      },
      {
        key: "vietnam",
        ...current.factories.vietnam,
        accent: "blue",
        headerIcon: DollarSign,
        badgeBg: "bg-blue-100 text-blue-800",
        iconWrap: "bg-blue-50",
        iconColor: "text-blue-600",
        pillBg: "bg-blue-50 text-blue-700 border-blue-100",
        dot: "bg-blue-500",
        border: "border-blue-100",
        glow: "from-blue-500/15 via-cyan-500/10 to-transparent",
      },
    ];
  }, [current]);

  const motionCommon = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reduceMotion ? 0 : 0.55 },
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <motion.div {...motionCommon} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            {current.title}
          </h2>
          <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {current.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {factories.map((f, idx) => (
            <motion.div
              key={f.key}
              initial={reduceMotion ? false : { opacity: 0, x: idx === 0 ? -18 : 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08 * idx }}
              className="relative"
            >
              {/* subtle glow */}
              <div
                className={cx(
                  "absolute -inset-1 rounded-3xl bg-gradient-to-r opacity-70 blur-2xl",
                  f.glow
                )}
              />

              <div
                className={cx(
                  "relative rounded-3xl border bg-white/70 backdrop-blur p-5 md:p-8 shadow-sm",
                  "transition hover:shadow-lg hover:-translate-y-0.5",
                  f.border
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className={cx("p-2 rounded-2xl border border-gray-200", f.iconWrap)}>
                        <Factory className={cx("h-6 w-6", f.iconColor)} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                        {f.name}
                      </h3>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="text-sm md:text-base truncate">{f.location}</span>
                    </div>
                  </div>

                  <span className={cx("shrink-0 rounded-full px-3 py-1 text-sm font-semibold", f.badgeBg)}>
                    {f.established}
                  </span>
                </div>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <MetricCard icon={Users} label={current.metrics.employees} value={f.employees} />
                  <MetricCard icon={Building} label={current.metrics.area} value={f.area} />
                </div>

                {/* Products */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">{current.metrics.products}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {f.products.map((product, i) => (
                      <span
                        key={`${f.key}-p-${i}`}
                        className={cx(
                          "px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm",
                          f.pillBg
                        )}
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advantages */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <f.headerIcon className="h-5 w-5 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">{current.metrics.advantages}</h4>
                  </div>
                  <AdvantageList items={f.advantages} dotClass={f.dot} />
                </div>

                {/* Description */}
                <div className={cx("mt-6 rounded-2xl border bg-white p-4 md:p-5", f.border)}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className={cx("h-5 w-5 mt-0.5", f.iconColor)} />
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile quick comparison */}
        <motion.div
          {...motionCommon}
          className="mt-10 md:hidden"
        >
          <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-4">{current.metrics.summaryTitle}</h4>

            <div className="space-y-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-700">{current.metrics.established}</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">{current.factories.china.name}</span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                    {current.factories.china.established}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">{current.factories.vietnam.name}</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                    {current.factories.vietnam.established}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-700">{current.metrics.area}</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">{current.factories.china.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{current.factories.china.area}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">{current.factories.vietnam.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{current.factories.vietnam.area}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Strategic note */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08 }}
          className="mt-10 text-center"
        >
          <p className="mx-auto max-w-2xl text-gray-600 text-sm md:text-base leading-relaxed">
            {current.metrics.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
