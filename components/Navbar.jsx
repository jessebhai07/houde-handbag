"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { key: "home", en: "Home", zh: "首页", href: "/" },
    { key: "products", en: "Products", zh: "产品", href: "/products" },
    { key: "gallery", en: "Gallery", zh: "画廊", href: "/gallery" },
    { key: "journey", en: "Journey", zh: "旅行", href: "/journey" },
    { key: "OEM/ODM", en: "OEM/ODM", zh: "OEM/ODM", href: "/oem-odm" },
    { key: "about", en: "About", zh: "关于", href: "/about" },
    { key: "contact", en: "Contact", zh: "联系我们", href: "/contact" },
  ];

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md h-16">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-gray-900">
              HOUDE HANDBAG
            </span>
            <span className="hidden md:block text-[10px] uppercase tracking-widest text-gray-500">
              {lang === "en" ? "Premium Goods" : "优质皮革制品"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? "text-amber-800" : "text-gray-600 hover:text-amber-800"
                }`}
              >
                {lang === "en" ? item.en : item.zh}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-amber-800" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full scale-90 md:scale-100">
            <span className={`text-[10px] font-bold ${lang === 'zh' ? 'text-amber-800' : 'text-gray-400'}`}>中</span>
            <Switch
              checked={lang === "en"}
              onCheckedChange={toggleLang}
              className="data-[state=checked]:bg-amber-800"
            />
            <span className={`text-[10px] font-bold ${lang === 'en' ? 'text-amber-800' : 'text-gray-400'}`}>EN</span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 top-16 bg-white z-40 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between p-4 rounded-lg border-b border-gray-50 ${
                pathname === item.href ? "bg-amber-50 text-amber-800" : "text-gray-700"
              }`}
            >
              <span className="font-medium">{lang === "en" ? item.en : item.zh}</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}