"use client";

import { dictionary } from "@/lib/dictionary/dictionary";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Initialize Context
const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("zh"); // Default to Chinese as per your code
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("app-lang");
    if (savedLang === "en" || savedLang === "zh") setLang(savedLang);
  }, []);

  const toggleLang = (isEnglish) => {
    const newLang = isEnglish ? "en" : "zh";
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  // ✅ NEW: The 't' helper function
  // This allows inline usage like: t("Hello", "你好")
  const t = (enOrObj, zh) => {
    // 1. Handle object input: t({ en: "Hi", zh: "你好" })
    if (typeof enOrObj === "object" && enOrObj !== null) {
      // Check for 'zh', 'zn', or 'zntitle' keys to be safe
      const zhText = enOrObj.zh || enOrObj.zn || enOrObj.zntitle;
      return lang === "en" ? enOrObj.en || enOrObj.entitle : zhText;
    }
    // 2. Handle standard input: t("Hi", "你好")
    return lang === "en" ? enOrObj : zh;
  };

  // Load dictionary based on language
  const dict = useMemo(() => dictionary?.[lang] ?? dictionary.en, [lang]);

  // ✅ Add 't' to the value object
  const value = { lang, dict, toggleLang, mounted, t };

  return (
    <LanguageContext.Provider value={value}>
      {/* Prevent hydration mismatch content shift */}
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}