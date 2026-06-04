"use client";

import { ChevronUp } from "lucide-react";

export function BackToTop({ label = "Back To Top" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-to-top group mt-5 w-full overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.07] p-px text-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80"
    >
      <span className="relative flex min-h-[64px] items-center justify-center gap-3 overflow-hidden rounded-[17px] bg-[linear-gradient(180deg,rgba(16,23,43,0.72),rgba(7,11,24,0.58))] px-4 py-3 transition duration-200 group-hover:bg-[linear-gradient(180deg,rgba(27,40,68,0.8),rgba(11,17,34,0.64))]">
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-100/24 to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-cyan-100/18 bg-[radial-gradient(circle_at_50%_0%,rgba(171,209,255,0.16),rgba(81,132,196,0.05)_58%,transparent_74%)] text-cyan-100/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(105,177,255,0.08)] transition group-hover:border-cyan-100/36 group-hover:text-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_22px_rgba(119,220,255,0.16)]">
          <span className="pointer-events-none absolute inset-1 rounded-full border border-white/5" />
          <ChevronUp size={19} strokeWidth={1.65} aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-blue-50">{label}</span>
      </span>
    </button>
  );
}
