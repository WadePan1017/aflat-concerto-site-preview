"use client";

import Image from "next/image";
import type { AboutBlock, PortfolioLabels, SiteInfo } from "@/data/site";

export function AboutSection({
  aboutBlocks,
  labels,
  siteInfo,
}: {
  aboutBlocks: AboutBlock[];
  labels: PortfolioLabels;
  siteInfo: SiteInfo;
}) {
  return (
    <section id="about">
      <div
        className="content-panel about-panel relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,19,44,0.96),rgba(7,11,28,0.84))] p-5 shadow-[0_18px_40px_rgba(5,8,20,0.32)] md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(164,180,255,0.14),transparent_24%),radial-gradient(circle_at_82%_10%,rgba(118,231,255,0.12),transparent_18%)]" />
        <div className="pointer-events-none absolute right-4 top-4 h-24 w-24 rounded-full border border-white/8" />
        <div className="pointer-events-none absolute right-10 top-10 h-12 w-12 rounded-full border border-white/10" />

        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[26px] bg-[radial-gradient(circle,_rgba(134,167,255,0.28),_transparent_72%)] blur-xl" />
              <Image
                src={siteInfo.avatar}
                alt="avatar"
                width={92}
                height={92}
                className="relative rounded-[24px] border border-blue-100/25 object-cover shadow-[0_0_20px_rgba(120,164,255,0.18)]"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.32em] text-blue-200/80">
                {labels.aboutEyebrow.toUpperCase()}
              </p>
              <h3 className="text-[2rem] leading-none font-semibold text-white">
                {labels.aboutTitle}
              </h3>
              <p className="mt-2 text-sm text-blue-100/75">{siteInfo.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {siteInfo.profileTags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs tracking-[0.18em] ${
                      index % 2 ? "text-cyan-50/85" : "text-blue-50/85"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <div className="stat-tile rounded-[18px] border border-white/10 bg-black/18 px-3 py-2.5 text-center">
              <p className="text-[11px] tracking-[0.22em] text-blue-200/65">
                {labels.role.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{siteInfo.role}</p>
            </div>
            <div className="stat-tile rounded-[18px] border border-white/10 bg-black/18 px-3 py-2.5 text-center">
              <p className="text-[11px] tracking-[0.22em] text-blue-200/65">
                {labels.aura.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{siteInfo.aura}</p>
            </div>
            <div className="stat-tile rounded-[18px] border border-white/10 bg-black/18 px-3 py-2.5 text-center">
              <p className="text-[11px] tracking-[0.22em] text-blue-200/65">
                {labels.style.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{siteInfo.style}</p>
            </div>
          </div>
        </div>

        <div className="relative mt-5 space-y-2">
          {aboutBlocks.map((block) => (
            <div
              key={block.title}
              className="info-tile rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,38,0.56),rgba(6,10,24,0.46))] px-4 py-2.5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="min-w-0 text-sm font-semibold tracking-[0.08em] text-blue-50">
                  {block.title}
                </h4>
                <span className="mt-2 h-px flex-1 bg-gradient-to-r from-blue-200/35 to-transparent" />
              </div>
              <p className="mt-1.5 text-sm leading-6 text-slate-200/88">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
