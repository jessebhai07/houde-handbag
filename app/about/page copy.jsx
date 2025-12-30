"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { content } from "@/lib/dictionary/aboutData";
import AboutHero from "./AboutHero";
import StoryAndMission from "./StoryAndMission";
import CertificatesSection from "./Certificates";
import CoreValues from "./CoreValues";
import CapabilitiesStats from "./Capabilities";
import MaterialsSection from "./MaterialSection";

export default function AboutPage() {
  const { lang } = useLanguage();
  const currentContent = useMemo(() => content?.[lang] ?? content.en, [lang]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <AboutHero content={currentContent} lang={lang} />

      <CertificatesSection
        data={currentContent.sections.certificates}
        lang={lang}
      />
      <StoryAndMission
        story={currentContent.sections.story}
        mission={currentContent.sections.mission}
      />

      <CoreValues data={currentContent.sections.values} lang={lang} />

      <CapabilitiesStats data={currentContent.sections.capabilities} />

      <MaterialsSection data={currentContent.sections.materials} />
    </div>
  );
}
