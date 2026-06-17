"use client";

import Image from "next/image";
import { Fingerprint, Orbit, Palette, type LucideIcon } from "lucide-react";
import { assetPath, type PortfolioLabels, type SiteInfo } from "@/data/site";

type Hotspot = {
  id: string;
  image?: string;
  label: string;
  target: "home" | "about" | "links" | "gallery" | "language";
  className: string;
  visible?: boolean;
  revealOnHover?: boolean;
};

const mainHotspots: Hotspot[] = [
  {
    id: "links",
    image: assetPath("/assets/hotspots/btn-links.png"),
    label: "Links",
    target: "links",
    className: "left-[69.89%] top-[79.96%] h-[12.08%] w-[12.29%]",
  },
  {
    id: "home",
    image: assetPath("/assets/hotspots/btn-home.png"),
    label: "Home",
    target: "home",
    className: "left-[83.10%] top-[79.96%] h-[12.08%] w-[12.45%]",
  },
];

const secondHotspots: Hotspot[] = [
  {
    id: "language",
    image: assetPath("/assets/hotspots/btn-second-language.png"),
    label: "Switch language",
    target: "language",
    className: "left-[68.9%] top-[80.65%] h-[12.5%] w-[12.55%]",
    visible: false,
    revealOnHover: true,
  },
  {
    id: "home",
    image: assetPath("/assets/hotspots/btn-second-home.png"),
    label: "Home",
    target: "home",
    className: "left-[81.43%] top-[80.65%] h-[12.5%] w-[12.55%]",
    visible: false,
    revealOnHover: true,
  },
];

const thirdHotspots: Hotspot[] = [
  {
    id: "language",
    image: assetPath("/assets/hotspots/btn-third-language.png"),
    label: "Switch language",
    target: "language",
    className: "left-[69%] top-[79.5%] h-[11%] w-[13%]",
    visible: false,
    revealOnHover: true,
  },
  {
    id: "home",
    image: assetPath("/assets/hotspots/btn-third-home.png"),
    label: "Home",
    target: "home",
    className: "left-[82%] top-[79.5%] h-[11%] w-[13%]",
    visible: false,
    revealOnHover: true,
  },
];

function scrollTo(target: Hotspot["target"]) {
  if (target === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const node = document.getElementById(target);
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getNavItems(labels: PortfolioLabels): Array<{
  label: string;
  eyebrow: string;
  target: Hotspot["target"];
  Icon: LucideIcon;
}> {
  return [
    {
      label: labels.navProfile,
      eyebrow: labels.navProfileEyebrow,
      target: "about",
      Icon: Fingerprint,
    },
    { label: labels.navLinks, eyebrow: labels.navLinksEyebrow, target: "links", Icon: Orbit },
    {
      label: labels.navGallery,
      eyebrow: labels.navGalleryEyebrow,
      target: "gallery",
      Icon: Palette,
    },
  ];
}

export function PosterStage({
  labels,
  siteInfo,
  siteKey,
  onLanguageSwitch,
}: {
  labels: PortfolioLabels;
  siteInfo: SiteInfo;
  siteKey: string;
  onLanguageSwitch: () => void;
}) {
  const navItems = getNavItems(labels);
  const hotspots =
    siteKey === "second" ? secondHotspots : siteKey === "third" ? thirdHotspots : mainHotspots;
  const hiddenHotspotClass = "bg-cyan-100/0 transition hover:bg-cyan-100/5";
  const posterWidth = siteKey === "third" ? 1836 : 1823;
  const posterHeight = siteKey === "third" ? 1122 : 1118;

  function handleHotspotClick(target: Hotspot["target"]) {
    if (target === "language") {
      onLanguageSwitch();
      return;
    }
    scrollTo(target);
  }

  return (
    <section id="home">
      <div
        className="poster-frame rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(6,11,24,0.94),rgba(4,8,20,0.88))] p-3 shadow-[0_30px_90px_rgba(8,12,28,0.55),0_0_48px_rgba(103,149,255,0.16)] md:rounded-[34px] md:p-4"
      >
        <div
          className="poster-canvas relative overflow-hidden rounded-[22px] border border-white/12 bg-slate-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] md:rounded-[28px]"
          style={{ aspectRatio: `${posterWidth} / ${posterHeight}` }}
        >
          <Image
            src={siteInfo.backgroundImage}
            alt="AFlatConcerto poster layout"
            width={posterWidth}
            height={posterHeight}
            className="h-auto w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/28" />

          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => handleHotspotClick(hotspot.target)}
              className={`group absolute z-20 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${hotspot.visible === false ? hiddenHotspotClass : ""} ${hotspot.className}`}
              aria-label={hotspot.label}
              title={hotspot.label}
            >
              {hotspot.image ? (
                <Image
                  src={hotspot.image}
                  alt={hotspot.label}
                  fill
                  sizes="(max-width: 768px) 30vw, 16vw"
                  className={`object-contain transition duration-150 group-hover:scale-[1.025] group-hover:brightness-125 group-active:scale-[0.99] ${
                    hotspot.revealOnHover
                      ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      : ""
                  }`}
                />
              ) : (
                <span className="sr-only">{hotspot.label}</span>
              )}
            </button>
          ))}
        </div>

        <nav className="poster-nav mt-3 grid grid-cols-3 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.07] p-px shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:mt-4">
          {navItems.map((item, index) => (
            <button
              key={item.target}
              type="button"
              onClick={() => scrollTo(item.target)}
              className="poster-nav-button group relative min-h-[66px] overflow-hidden bg-[linear-gradient(180deg,rgba(16,23,43,0.72),rgba(7,11,24,0.58))] px-2.5 py-2.5 text-blue-50 transition duration-200 hover:bg-[linear-gradient(180deg,rgba(27,40,68,0.8),rgba(11,17,34,0.64))] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-cyan-200/80 md:min-h-[74px] md:px-4"
            >
              {index < navItems.length - 1 ? (
                <span className="pointer-events-none absolute inset-y-3 right-0 w-px bg-white/10" />
              ) : null}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-100/24 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="relative flex h-full flex-col items-center justify-center gap-1.5 text-center md:flex-row md:gap-3 md:text-left">
                <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-cyan-100/18 bg-[radial-gradient(circle_at_50%_0%,rgba(171,209,255,0.16),rgba(81,132,196,0.05)_58%,transparent_74%)] text-cyan-100/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(105,177,255,0.08)] transition group-hover:border-cyan-100/36 group-hover:text-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_22px_rgba(119,220,255,0.16)] md:size-9">
                  <span className="pointer-events-none absolute inset-1 rounded-full border border-white/5" />
                  <item.Icon size={18} strokeWidth={1.55} aria-hidden="true" />
                </span>
                <span className="min-w-0 leading-none">
                  <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/48 sm:block">
                    {item.eyebrow}
                  </span>
                  <span className="block text-[12px] font-semibold text-blue-50 sm:mt-1 sm:text-sm md:text-base">
                    {item.label}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
