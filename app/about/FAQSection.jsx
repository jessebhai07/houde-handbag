"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/LanguageProvider";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    value: "item-1",
    question: {
      en: "What is your minimum order quantity (MOQ)?",
      zh: "您的起订量（MOQ）是多少？",
    },
    answer: {
      en: [
        "Custom Projects: ranges from 500 to 1000pcs (depending on type).",
        "Stock Orders: minimum is 100pcs.",
      ],
      zh: [
        "定制项目：500至1000件不等（取决于具体袋型）。",
        "库存订单：最低起订量为100件。",
      ],
    },
  },
  {
    value: "item-2",
    question: {
      en: "What is your normal turn-around time?",
      zh: "您的正常周转时间是多久？",
    },
    answer: {
      en: [
        "Normal turn-around time is 2-5 weeks after approval of printing layout or physical pre-production sample. It depends on the order quantity.",
      ],
      zh: [
        "正常的周转时间为确认印刷版面或实物产前样后的2-5周。具体时间取决于订单数量。",
      ],
    },
  },
  {
    value: "item-3",
    question: {
      en: "What are your shipping options?",
      zh: "您有哪些运输方式选择？",
    },
    answer: {
      en: [
        "1) For large quantities, we can use sea freight service. The destination will be the nearest international seaport, then trucking to your warehouse.",
        "2) DHL, UPS and FedEx can be used for door-to-door shipping of smaller quantities. These options are more expensive, but faster and more reliable.",
        "3) Delivery Estimates: Standard Courier (3-5 Days), Standard Air (4-7 Days), Standard Sea (18-35 Days).",
        "Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.",
      ],
      zh: [
        "1) 对于大批量订单，我们可以使用海运服务。货物将运至最近的国际海港，然后安排卡车派送到您的仓库。",
        "2) 小批量订单可使用 DHL、UPS 和 FedEx 进行门到门运输。这些选项费用较高，但交付时间更短且更可靠。",
        "3) 预计交货时间：标准快递（3-5天），标准空运（4-7天），标准海运（18-35天）。",
        "我们的无忧退货流程包括免费退货运输，并在收到退货后48小时内全额退款。",
      ],
    },
  },
  {
    value: "item-4",
    question: {
      en: "Do you provide custom packaging?",
      zh: "您提供定制包装吗？",
    },
    answer: {
      en: [
        "Yes. Our standard packaging is 200 pieces per carton, but custom packaging is also available.",
      ],
      zh: [
        "是的。我们的标准包装是每箱200件，但也提供定制包装服务。",
      ],
    },
  },
  {
    value: "item-5",
    question: {
      en: "Do you charge for designs?",
      zh: "设计需要收费吗？",
    },
    answer: {
      en: [
        "Of course not! Our goal is to build a long-term relationship with all of our clients. We offer our creative design services at no cost.",
      ],
      zh: [
        "当然不收费！我们的目标是与所有客户建立长期的合作关系。我们免费为您提供创意设计服务。",
      ],
    },
  },
  {
    value: "item-6",
    question: {
      en: "What artwork format do you accept?",
      zh: "您接受什么格式的设计稿？",
    },
    answer: {
      en: ["We accept AI, EPS, PDF and PSD files."],
      zh: ["我们接受 AI, EPS, PDF 和 PSD 文件格式。"],
    },
  },
  {
    value: "item-7",
    question: {
      en: "What if I want design changes?",
      zh: "如果我想修改设计怎么办？",
    },
    answer: {
      en: [
        "Usually, our clients ask us to tweak a few specs on the bag, whether it be colors, layout, or artwork changes. Whatever the revision, big or small, we will continue to revise your bag designs until you fall in love.",
      ],
      zh: [
        "通常客户会要求调整包袋的一些规格，无论是颜色、布局还是图案更改。无论修改大小，我们都会持续修改设计，直到您完全满意为止。",
      ],
    },
  },
  {
    value: "item-8",
    question: {
      en: "Do you provide a pre-production sample?",
      zh: "您提供产前样吗？",
    },
    answer: {
      en: [
        "Yes, a virtual (digital) sample is provided for each confirmed order.",
        "For orders with critical color, a physical pre-production sample can be ordered at an additional cost. Ordering a physical pre-production sample will add 2-3 weeks to the total time required due to setup and international shipping.",
      ],
      zh: [
        "是的，每个确认的订单都会提供虚拟（数字）样品。",
        "对于颜色要求严格的订单，可付费订购实物产前样。由于单独的设置和国际运输时间，订购实物产前样会使总交期增加2-3周。",
      ],
    },
  },
  {
    value: "item-9",
    question: {
      en: "How long does it take to get a pre-production sample?",
      zh: "获取产前样需要多长时间？",
    },
    answer: {
      en: [
        "A printing layout will be provided within 24 hours of receiving your artwork.",
        "A physical pre-production sample usually takes 3-7 days - to make the printing plates, produce the sample, then delivery to your door.",
      ],
      zh: [
        "收到您的设计稿后，我们将在24小时内提供印刷版面。",
        "实物产前样通常需要3-7天——包括制版、生产样品以及派送到您手中的时间。",
      ],
    },
  },
  {
    value: "item-10",
    question: {
      en: "Are samples free?",
      zh: "样品免费吗？",
    },
    answer: {
      en: [
        "Most custom items are not available as samples. Similar random bags can be provided at no charge. Carrier's account number is required for express shipping and 3+ samples.",
      ],
      zh: [
        "大多数定制项目无法直接作为样品提供。我们可以免费提供类似的随机库存包袋作为参考。如需快递运输或索取3个以上样品，需提供您的快递账号。",
      ],
    },
  },
  {
    value: "item-11",
    question: {
      en: "What are your payment terms?",
      zh: "您的付款条款是什么？",
    },
    answer: {
      en: [
        "Once the full order is confirmed, a 30% order deposit is due.",
        "The balance is due when production is complete and before shipment.",
        "For special payment term requests speak to your Project Manager.",
      ],
      zh: [
        "完整订单确认后，需支付30%的定金。",
        "生产完成并发货前需支付尾款。",
        "如有特殊付款条款需求，请联系您的项目经理。",
      ],
    },
  },
  {
    value: "item-12",
    question: {
      en: "Which payment methods do you accept?",
      zh: "您接受哪些付款方式？",
    },
    answer: {
      en: [
        "1) PayPal (if the amount is below USD1000, but a 5% transaction fee will be charged).",
        "2) Wire transfer (T/T).",
      ],
      zh: [
        "1) PayPal（金额低于1000美元时可用，但需加收5%的手续费）。",
        "2) 银行电汇（T/T）。",
      ],
    },
  },
  {
    value: "item-13",
    question: {
      en: "How long does production take?",
      zh: "生产需要多长时间？",
    },
    answer: {
      en: [
        "Production takes 15-30 calendar days after approval of printing layout or physical pre-production sample.",
      ],
      zh: [
        "确认印刷版面或实物产前样后，生产需要15-30个自然日。",
      ],
    },
  },
  {
    value: "item-14",
    question: {
      en: "Can you accommodate rush orders?",
      zh: "可以接急单吗？",
    },
    answer: {
      en: [
        "Yes, we can provide 10-20 days turn-around after approval of printing layout or physical pre-production sample with air or courier shipping.",
      ],
      zh: [
        "可以，配合空运或快递运输，我们可以在确认版面或实物样后提供10-20天的极速交付。",
      ],
    },
  },
];

export default function FAQSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="py-24 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            {isEn ? "Frequently Asked Questions" : "常见问题解答"}
          </h2>
          <p className="text-lg text-slate-600 font-light">
            {isEn 
              ? "Everything you need to know about ordering, manufacturing, and shipping." 
              : "关于订购、生产和运输，您需要了解的一切。"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item) => (
              <AccordionItem key={item.value} value={item.value} className="border-b-slate-100 last:border-0">
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-amber-700 hover:no-underline py-5 px-2">
                  {item.question[isEn ? "en" : "zh"]}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 leading-relaxed px-2 pb-6">
                  <div className="flex flex-col gap-3">
                    {item.answer[isEn ? "en" : "zh"].map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Support CTA */}
        <div className="mt-12 text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-600 mb-2">
            {isEn ? "Still have questions?" : "还有其他问题吗？"}
          </p>
          <Link href="/contact" className="text-amber-700 font-bold hover:underline text-lg">
            {isEn ? "Contact our support team" : "联系我们的支持团队"}
          </Link>
        </div>
      </div>
    </section>
  );
}