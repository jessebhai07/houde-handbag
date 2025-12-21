export const homeData = {
    en: {
      hero: {
        title: "Precision Manufacturing, Global Trusted Partner",
        subtitle:
          "From heavy-duty tool bags to precision digital cases. We are a comprehensive enterprise integrating R&D, production, and sales, serving top-tier global brands since 2014.",
        cta: "Explore Our Solutions",
      },
      sections: [
        {
          title: "Professional Tool Solutions",
          description:
            "Trusted by industry giants like Milwaukee and RYOBI. We manufacture heavy-duty tool kits, rolling bags, and organizers using reinforced nylon and canvas for maximum durability.",
          cta: "View Tool Series",
        },
        {
          title: "Digital & Tech Protection",
          description:
            "Expert craftsmanship in EVA hard-shell cases for game consoles (Switch/Steam Deck), drone cases, and laptop protection, ensuring shock-proof safety for modern devices.",
          cta: "View Tech Series",
        },
        {
          title: "Lifestyle & Fashion",
          description:
            "Diverse production capabilities ranging from trendy backpacks and insulated lunch bags to elegant makeup organizers and musical instrument cases using PU, PVC, and eco-friendly fabrics.",
          cta: "View Lifestyle Series",
        },
      ],
      achievements: {
        title: "Company Strength",
        stats: [
          { number: "7000+", label: "Square Meters Factory" },
          { number: "300+", label: "Skilled Employees" },
          { number: "2014", label: "Year Established" },
        ],
      },
      productCategories: {
        title: "Product Catalog",
        categories: [
          { name: "Tool & Equipment Bags", count: "Professional Grade" },
          { name: "Game & Digital Cases", count: "EVA Protection" },
          { name: "Fashion & Backpacks", count: "Trending Styles" },
          { name: "Home & Storage", count: "Daily Essentials" },
        ],
      },
      footer: {
        companyName: "Dongguan Chainhui Handbag Co., Ltd.",
        copyright: "© {{year}} Chainhui Manufacturing. All Rights Reserved.",
      },
    },
    zh: {
      hero: {
        title: "专业手袋制造 全球信赖伙伴",
        subtitle:
          "从重型工具包到精密数码收纳，我们是一家集研发、生产、销售于一体的综合性企业，自2014年起服务于全球顶尖品牌。",
        cta: "探索我们的方案",
      },
      sections: [
        {
          title: "专业工具收纳",
          description:
            "深受 Milwaukee 和 RYOBI 等行业巨头信赖。我们使用强化尼龙和帆布制造重型工具包、拉杆包和收纳件，确保极致耐用。",
          cta: "查看工具系列",
        },
        {
          title: "数码科技防护",
          description:
            "精湛的 EVA 硬壳工艺，专为游戏机（Switch/Steam Deck）、无人机和笔记本电脑提供防震保护，守护您的精密设备。",
          cta: "查看数码系列",
        },
        {
          title: "时尚生活方式",
          description:
            "多样化的生产能力，涵盖潮流背包、保温餐包、精致化妆包及乐器包，精选 PU、PVC 及环保面料。",
          cta: "查看生活系列",
        },
      ],
      achievements: {
        title: "企业实力",
        stats: [
          { number: "7000+", label: "平方米厂房面积" },
          { number: "300+", label: "专业员工" },
          { number: "2014", label: "成立年份" },
        ],
      },
      productCategories: {
        title: "产品目录",
        categories: [
          { name: "工具与设备包", count: "专业级" },
          { name: "游戏与数码包", count: "EVA防护" },
          { name: "时尚与背包", count: "潮流款式" },
          { name: "家居与收纳", count: "日常必备" },
        ],
      },
      footer: {
        companyName: "东莞市链辉手袋有限公司",
        copyright: "© {{year}} 链辉手袋 版权所有",
      },
    },
  };
  
  // Image URLs (Suggest updating these to match the new industrial/fashion mix)
  export const homeImages = {
    // You might want to replace this video with factory footage or product showcases
    heroVideo: "https://www.pexels.com/download/video/6003975/", 
    sectionImages: [
      // Representing Tool Bags/Manufacturing
      "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // Representing Tech/EVA Cases
      "https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // Representing Lifestyle/Fashion
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    categoryImages: [
      "https://images.pexels.com/photos/3615461/pexels-photo-3615461.jpeg?auto=compress&cs=tinysrgb&w=600", // Tool Bag vibe
      "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=600",   // Tech vibe
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600", // Backpack
      "https://images.pexels.com/photos/5806941/pexels-photo-5806941.jpeg?auto=compress&cs=tinysrgb&w=600", // Lunch/Home bag
    ],
  };
  
  // Helper function to get current year for copyright
  export function getCurrentYear() {
    return new Date().getFullYear();
  }