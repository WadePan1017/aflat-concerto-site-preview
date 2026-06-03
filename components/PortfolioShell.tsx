"use client";

import { useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { LinksSection } from "@/components/LinksSection";
import { PosterStage } from "@/components/PosterStage";
import type { Language, SiteContent } from "@/data/site";

type PortfolioShellProps = {
  contentByLanguage: Record<Language, SiteContent>;
};

export function PortfolioShell({ contentByLanguage }: PortfolioShellProps) {
  const [language, setLanguage] = useState<Language>("en");
  const content = contentByLanguage[language];
  const otherLanguage = language === "en" ? "zh" : "en";

  function switchLanguage() {
    const nextLanguage = otherLanguage;
    setLanguage(nextLanguage);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", url);
  }

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <div className="page-aura" />
      <div className="fixed top-4 left-4 z-40">
        <button
          type="button"
          onClick={switchLanguage}
          className="rounded-full border border-blue-100/25 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-blue-50 shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-md transition hover:border-cyan-100/40 hover:bg-blue-900/45"
          aria-label="Switch language"
        >
          {language === "en" ? content.labels.languageZh : content.labels.languageEn}
        </button>
      </div>
      <main className="relative mx-auto flex w-full max-w-[1560px] flex-col gap-5 px-3 pt-3 pb-10 md:gap-6 md:px-5 md:pt-5 md:pb-14 xl:px-8">
        <PosterStage labels={content.labels} siteInfo={content.siteInfo} />

        <section className="relative space-y-5 md:space-y-6">
          <div className="pointer-events-none absolute inset-x-10 top-6 -z-10 h-48 rounded-full bg-[radial-gradient(circle,_rgba(121,163,255,0.22),_transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-10 top-24 -z-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(172,139,255,0.18),_transparent_68%)] blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-12 -z-10 h-40 w-64 rounded-full bg-[radial-gradient(circle,_rgba(106,236,255,0.16),_transparent_70%)] blur-3xl" />
          <AboutSection
            aboutBlocks={content.aboutBlocks}
            labels={content.labels}
            siteInfo={content.siteInfo}
          />
          <LinksSection labels={content.labels} links={content.links} />
          <GallerySection gallery={content.gallery} labels={content.labels} />
        </section>
      </main>
    </div>
  );
}
