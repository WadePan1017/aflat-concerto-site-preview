"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem, PortfolioLabels } from "@/data/site";

type GalleryModalProps = {
  item: GalleryItem | null;
  labels: PortfolioLabels;
  onClose: () => void;
};

function getCategoryLabel(labels: PortfolioLabels, category: string) {
  return labels.categoryLabels[category] ?? category;
}

function getRole(item: GalleryItem, labels: PortfolioLabels) {
  return item.role ?? (item.category ? getCategoryLabel(labels, item.category) : labels.artworkFallback);
}

function getColor(item: GalleryItem, labels: PortfolioLabels) {
  return item.colorPalette ?? labels.tbd;
}

function getDate(item: GalleryItem, labels: PortfolioLabels) {
  return item.createdAt ?? labels.tbd;
}

export function GalleryModal({ item, labels, onClose }: GalleryModalProps) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="gallery-modal-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(84,122,210,0.18),transparent_24%),rgba(2,4,12,0.82)] p-3 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="gallery-modal-close fixed top-4 right-4 z-[60] rounded-full border border-white/14 bg-slate-950/72 px-4 py-2 text-sm tracking-[0.18em] text-blue-50 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-slate-900/88 md:hidden"
            aria-label={labels.close}
          >
            {labels.close}
          </button>
          <motion.div
            className="gallery-modal-panel relative my-12 grid w-full max-w-5xl gap-4 overflow-hidden rounded-[30px] border border-blue-100/18 bg-[linear-gradient(180deg,rgba(10,16,38,0.95),rgba(5,8,22,0.88))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:my-0 md:grid-cols-[1.55fr_0.8fr]"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-modal-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(158,178,255,0.12),transparent_20%),radial-gradient(circle_at_100%_10%,rgba(106,230,255,0.1),transparent_18%)]" />
            <div className="gallery-modal-line pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

            <div className="gallery-modal-image relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[24px] border border-white/12 bg-black/40 p-3 md:min-h-[360px]">
              <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/10" />
              <Image
                src={item.fullImage ?? item.thumbnail}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="h-auto max-h-[40dvh] w-auto max-w-full object-contain md:max-h-[76vh]"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>

            <aside className="gallery-modal-details relative overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(18,26,56,0.92),rgba(10,15,34,0.84))] p-4 text-slate-100 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-[0.28em] text-blue-200/60">
                    {labels.workDetails.toUpperCase()}
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold text-white">{item.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="gallery-modal-close hidden rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs tracking-[0.18em] text-blue-50 transition hover:bg-white/12 md:inline-flex"
                >
                  {labels.close}
                </button>
              </div>

              {item.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="gallery-modal-tag rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] text-blue-50/82"
                  >
                    #{tag}
                  </span>
                  ))}
                </div>
              ) : null}

              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {[
                  [
                    labels.character,
                    getRole(item, labels),
                  ],
                  [labels.color, getColor(item, labels)],
                  [
                    labels.type,
                    item.category
                      ? getCategoryLabel(labels, item.category)
                      : labels.artworkFallback,
                  ],
                  [labels.date, getDate(item, labels)],
                ].map(([label, value]) => (
                  <div key={label} className="gallery-modal-metric rounded-[18px] border border-white/10 bg-black/16 p-3">
                    <dt className="text-[11px] tracking-[0.22em] text-blue-200/55">{label}</dt>
                    <dd className="mt-2 text-sm font-medium text-white md:text-base">{value}</dd>
                  </div>
                ))}
              </dl>

              {item.description ? (
                <div className="gallery-modal-notes mt-2 rounded-[18px] border border-white/10 bg-black/16 p-4">
                  <p className="text-[11px] tracking-[0.22em] text-blue-200/55">
                    {labels.notes.toUpperCase()}
                  </p>
                  <p className="mt-2.5 leading-7 text-slate-200/92">{item.description}</p>
                </div>
              ) : null}
            </aside>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
