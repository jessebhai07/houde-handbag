// components/FactoryComparison.jsx
"use client";

import { useLanguage } from "./LanguageProvider";
import { Factory, MapPin, Users, Building, Package, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function FactoryComparison() {
  const { lang } = useLanguage();

  const data = {
    en: {
      title: "Our Manufacturing Facilities",
      subtitle: "Strategic Locations for Global Excellence",
      factories: {
        china: {
          name: "Chinese Factory",
          location: "Dongguan, China",
          established: "2014",
          employees: "180+",
          area: "10,000 m²",
          products: [
            "Tool bag",
            "Hay collection bag",
            "Cosmetic bag",
            "Backpack",
            "Game case",
            "EVA CASE"
          ],
          advantages: [
            "Development & design",
            "Production capacity & efficiency",
            "Complete supply chain integration"
          ],
          description: "Our flagship facility specializes in complex designs and premium quality production."
        },
        vietnam: {
          name: "Vietnam Factory",
          location: "Binh Duong, Vietnam",
          established: "2014",
          employees: "180+",
          area: "5,000 m²",
          products: [
            "Tool bag",
            "Hay collection bag",
            "Cosmetic bag",
            "Backpack",
            "Game case",
            "EVA CASE"
          ],
          advantages: [
            "Low production cost",
            "Tariff advantages",
            "Rapid delivery to ASEAN markets"
          ],
          description: "Cost-effective production with special access to regional trade agreements."
        }
      },
      metrics: {
        established: "Established",
        employees: "Employees",
        area: "Covered Area",
        products: "Products",
        advantages: "Advantages",
        viewDetails: "View Details",
        compare: "Compare Facilities"
      }
    },
    zh: {
      title: "我们的生产基地",
      subtitle: "战略布局，全球卓越",
      factories: {
        china: {
          name: "中国工厂",
          location: "中国东莞",
          established: "2014年",
          employees: "180+",
          area: "10,000 平方米",
          products: [
            "工具包",
            "收纳包",
            "化妆包",
            "背包",
            "游戏箱",
            "EVA箱"
          ],
          advantages: [
            "开发与设计",
            "生产能力与效率",
            "完整供应链整合"
          ],
          description: "我们的旗舰工厂专注于复杂设计和优质生产。"
        },
        vietnam: {
          name: "越南工厂",
          location: "越南平阳省",
          established: "2014年",
          employees: "180+",
          area: "5,000 平方米",
          products: [
            "工具包",
            "收纳包",
            "化妆包",
            "背包",
            "游戏箱",
            "EVA箱"
          ],
          advantages: [
            "低成本生产",
            "关税优势",
            "快速交付东盟市场"
          ],
          description: "成本效益高，享受区域贸易协定特殊待遇。"
        }
      },
      metrics: {
        established: "成立时间",
        employees: "员工人数",
        area: "占地面积",
        products: "产品范围",
        advantages: "优势特点",
        viewDetails: "查看详情",
        compare: "设施对比"
      }
    }
  };

  const current = data[lang];

  return (
    <section className="py-16 md:py-24 bg-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {current.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {current.subtitle}
          </p>
        </motion.div>

        {/* Main Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Chinese Factory */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl opacity-20 blur"></div> */}
            <div className="relative bg-gray-100 rounded-2xl p-6 md:p-8 ">
              {/* Factory Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Factory className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {current.factories.china.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{current.factories.china.location}</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {current.factories.china.established}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{current.metrics.employees}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.factories.china.employees}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{current.metrics.area}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.factories.china.area}</div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{current.metrics.products}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.factories.china.products.map((product, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{current.metrics.advantages}</h4>
                </div>
                <ul className="space-y-2">
                  {current.factories.china.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 italic border-l-4 rounded-l-lg border-red-200 pl-4 py-2">
                {current.factories.china.description}
              </p>

              
            </div>
          </motion.div>

          {/* Vietnam Factory */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gray-100 rounded-2xl p-6 md:p-8 ">
              {/* Factory Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Factory className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {current.factories.vietnam.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{current.factories.vietnam.location}</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {current.factories.vietnam.established}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{current.metrics.employees}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.factories.vietnam.employees}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{current.metrics.area}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.factories.vietnam.area}</div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{current.metrics.products}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.factories.vietnam.products.map((product, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{current.metrics.advantages}</h4>
                </div>
                <ul className="space-y-2">
                  {current.factories.vietnam.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 italic border-l-4 rounded-l-lg border-blue-200 pl-4 py-2">
                {current.factories.vietnam.description}
              </p>

              {/* Action Button */}
              
            </div>
          </motion.div>
        </div>

        {/* Comparison Summary - Mobile View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 md:hidden"
        >
          <div className="bg-white rounded-2xl p-6 ">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">对比总结</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{current.metrics.established}</span>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {current.factories.china.established}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {current.factories.vietnam.established}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{current.metrics.area}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-900 font-semibold">{current.factories.china.area}</span>
                  <span className="text-gray-900 font-semibold">{current.factories.vietnam.area}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table - Desktop View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 hidden md:block"
        >
          <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 ">
            <h4 className="font-bold text-gray-900 mb-6 text-xl text-center">
              {current.metrics.compare}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-50 rounded-2xl p-2">
                    <th className="py-4 px-6 text-left text-gray-700 font-semibold">{lang === 'en' ? 'Feature' : '特性'}</th>
                    <th className="py-4 px-6 text-center text-red-600 font-semibold">{current.factories.china.name}</th>
                    <th className="py-4 px-6 text-center text-blue-600 font-semibold">{current.factories.vietnam.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">{current.metrics.established}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {current.factories.china.established}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {current.factories.vietnam.established}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">{current.metrics.employees}</td>
                    <td className="py-4 px-6 text-center text-gray-900 font-semibold">{current.factories.china.employees}</td>
                    <td className="py-4 px-6 text-center text-gray-900 font-semibold">{current.factories.vietnam.employees}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">{current.metrics.area}</td>
                    <td className="py-4 px-6 text-center text-gray-900 font-semibold">{current.factories.china.area}</td>
                    <td className="py-4 px-6 text-center text-gray-900 font-semibold">{current.factories.vietnam.area}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">{lang === 'en' ? 'Primary Advantage' : '主要优势'}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col gap-1">
                        {current.factories.china.advantages.slice(0, 2).map((adv, idx) => (
                          <span key={idx} className="text-sm text-gray-700">{adv}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col gap-1">
                        {current.factories.vietnam.advantages.slice(0, 2).map((adv, idx) => (
                          <span key={idx} className="text-sm text-gray-700">{adv}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Strategic Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Both facilities work in synergy to provide flexible, cost-effective solutions for clients worldwide.'
              : '两大生产基地协同工作，为全球客户提供灵活且具成本效益的解决方案。'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}