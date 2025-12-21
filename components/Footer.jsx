"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const { dict } = useLanguage();
  const f = dict?.footer || {};
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl border flex items-center justify-center font-bold">
                {f?.brand?.logoText || "B"}
              </div>
              <div className="leading-tight">
                <p className="font-semibold tracking-tight">
                  {f?.brand?.name || "BagWorks"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {f?.brand?.tagline ||
                    "Manufacturing • OEM/ODM • Custom Branding"}
                </p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm">
              {f?.brand?.desc ||
                "We manufacture bags with consistent quality for long-term partnerships."}
            </p>

            {/* Social */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href={f?.social?.instagram || "#"} aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={f?.social?.facebook || "#"} aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={f?.social?.linkedin || "#"} aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-5 mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol title={f?.cols?.company?.title || "Company"}>
              <FooterLink
                href="/about"
                label={f?.cols?.company?.about || "About"}
              />
              <FooterLink
                href="/products"
                label={f?.cols?.company?.products || "Products"}
              />
              <FooterLink
                href="/business"
                label={f?.cols?.company?.factory || "Factory"}
              />
              <FooterLink
                href="/contact"
                label={f?.cols?.company?.contact || "Contact"}
              />
            </FooterCol>
          </div>

          {/* Contact + Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-sm font-semibold">
              {f?.contact?.title || "Contact"}
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{f?.contact?.address || "your company address"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  className="hover:text-foreground"
                  href={`tel:${f?.contact?.phoneRaw || "+8801000000000"}`}
                >
                  {f?.contact?.phone || "+880 10 0000 0000"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  className="hover:text-foreground"
                  href={`mailto:${f?.contact?.email || "sales@bagworks.com"}`}
                >
                  {f?.contact?.email || "sales@bagworks.com"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} {f?.brand?.name || "BagWorks"}.{" "}
            {f?.bottom?.rights || "All rights reserved."}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <FooterLink href="/terms" label={f?.bottom?.terms || "Terms"} />
            <FooterLink
              href="/privacy"
              label={f?.bottom?.privacy || "Privacy"}
            />
            <FooterLink
              href="/cookies"
              label={f?.bottom?.cookies || "Cookies"}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <Link className="hover:text-foreground transition-colors" href={href}>
        {label}
      </Link>
    </li>
  );
}
