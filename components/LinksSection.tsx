"use client";

import type { LinkItem, PortfolioLabels } from "@/data/site";

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function LinksSection({
  labels,
  links,
}: {
  labels: PortfolioLabels;
  links: LinkItem[];
}) {
  return (
    <section id="links">
      <div
        className="content-panel links-panel relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,38,0.96),rgba(6,10,25,0.84))] p-5 shadow-[0_18px_40px_rgba(5,8,20,0.32)] md:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(165,196,255,0.08),transparent_20%),radial-gradient(circle_at_90%_20%,rgba(111,236,255,0.08),transparent_16%)]" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.32em] text-blue-200/80">
              {labels.linksEyebrow.toUpperCase()}
            </p>
            <h3 className="text-2xl font-semibold text-white">{labels.linksTitle}</h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-300/90 md:max-w-none">
              {labels.linksDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={toTop}
            className="home-pill shrink-0 rounded-full border border-blue-200/30 bg-blue-300/15 px-4 py-2 text-sm font-semibold text-blue-50 transition hover:bg-blue-300/28"
          >
            {labels.home}
          </button>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2 md:grid-cols-1">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="link-card group relative flex min-h-[116px] flex-col items-start justify-between overflow-hidden rounded-[18px] border border-white/12 bg-slate-900/28 p-3 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-blue-900/25 md:min-h-0 md:flex-row md:items-center md:px-4 md:py-2.5"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/8 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="relative flex min-w-0 flex-col gap-2 md:flex-row md:items-center">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-100/30 bg-[linear-gradient(180deg,rgba(89,116,176,0.42),rgba(37,55,94,0.18))] text-sm font-semibold text-blue-50 shadow-[0_0_18px_rgba(112,156,255,0.14)] md:size-10">
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-blue-50 md:text-base md:font-medium">
                    {item.name}
                  </span>
                </span>
              </span>
              <span className="relative max-w-full text-xs leading-5 text-blue-200/70 group-hover:text-blue-100 md:text-sm">
                {item.note || "Visit"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
