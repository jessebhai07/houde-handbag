"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { 
  Palette, 
  Layers, 
  Zap, 
  Award, 
  Tag, 
  HeartHandshake, 
  ShieldCheck 
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* CONTENT DATA */
/* -------------------------------------------------------------------------- */
const whyUsContent = {
  header: {
    title: { en: "Why Choose Us?", zh: "为什么选择我们？" },
    subtitle: { 
      en: "We are dedicated to making stylish and fashionable custom bags combined with function to suit your brand and lifestyle.", 
      zh: "我们致力于打造集时尚风格与实用功能于一体的定制包袋，完美契合您的品牌形象与生活方式。" 
    }
  },
  guarantee: {
    title: { en: "100% Satisfaction Guarantee", zh: "100% 满意保证" },
    description: {
      en: "All our orders are backed by a 100% satisfaction guarantee - if for any reason your order isn't 100% right, we'll make it right or refund your money.",
      zh: "我们要有订单均享有 100% 满意保证——如果因任何原因您的订单未达到 100% 满意，我们将为您修正或全额退款。"
    }
  },
  features: [
    {
      icon: Palette,
      title: { en: "Full Customization", zh: "完全定制" },
      description: {
        en: "We make bags in every size and color. Whether you want one color one location or full-color full bleed, we are up to the task. From single designs to reoccurring custom orders, You imagine it, We make it!",
        zh: "无论是尺寸还是颜色，无论是单色局部印刷还是全彩满版印刷，我们都能胜任。从单次设计到周期性定制订单，您所想，我所造！"
      }
    },
    {
      icon: Layers,
      title: { en: "Variety and Options", zh: "种类丰富" },
      description: {
        en: "Tons of options for material, handles, piping, pockets, and closures. We make tote bags, insulated bags, messenger bags, and more. Square corners, round bottoms, die-cut handles? If you need it, we can make it!",
        zh: "提供海量材质、手柄、包边、口袋和闭合方式选择。我们需要手提袋、保温袋、邮差袋等多种款式。方形角、圆底、模切手柄？只要您需要，我们就能做！"
      }
    },
    {
      icon: Zap,
      title: { en: "Fast Turnaround", zh: "极速交付" },
      description: {
        en: "We work around the clock to deliver overseas orders in as little as 15 days. That's right, 15 days for overseas production and domestic delivery. Best of all? There are no rush charges!",
        zh: "我们昼夜不停地工作，海外订单最快仅需 15 天即可交付。没错，海外生产加国内交付仅需 15 天。最棒的是？没有加急费！"
      }
    },
    {
      icon: Award,
      title: { en: "Quality Products", zh: "卓越品质" },
      description: {
        en: "Every order we complete is crafted from the highest quality materials, chosen for their durable construction and accurate printing capabilities.",
        zh: "我们完成的每一个订单都选用最优质的材料制作，确保结构耐用且印刷精准，只为呈现最佳品质。"
      }
    },
    {
      icon: Tag,
      title: { en: "Affordable Pricing", zh: "价格实惠" },
      description: {
        en: "Sustainability shouldn’t cost a small fortune. We strive to offer the most affordable and competitive pricing around without compromising on quality.",
        zh: "可持续发展不应昂贵。我们致力于在不牺牲质量的前提下，提供最实惠且极具竞争力的价格。"
      }
    },
    {
      icon: HeartHandshake,
      title: { en: "A+ Customer Service", zh: "A+级客户服务" },
      description: {
        en: "Integrity and total professionalism. From your first contact to the final delivery (and everything in between), we're here to help in any way you need.",
        zh: "诚信为本，专业至上。从您的第一次咨询到最终交付（以及中间的每一个环节），我们随时为您提供所需的一切帮助。"
      }
    }
  ]
};

export default function WhyUsSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 font-sans">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              {whyUsContent.header.title[isEn ? "en" : "zh"]}
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              {whyUsContent.header.subtitle[isEn ? "en" : "zh"]}
            </p>
          </motion.div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {whyUsContent.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-amber-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-amber-700 transition-colors">
                {feature.title[isEn ? "en" : "zh"]}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {feature.description[isEn ? "en" : "zh"]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* GUARANTEE BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-10 md:p-16 text-center shadow-2xl"
        >
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
             <div className="absolute left-0 bottom-0 w-64 h-64 bg-amber-700 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
            <ShieldCheck className="w-16 h-16 text-amber-400 mb-6" />
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-amber-50">
              {whyUsContent.guarantee.title[isEn ? "en" : "zh"]}
            </h3>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              {whyUsContent.guarantee.description[isEn ? "en" : "zh"]}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}