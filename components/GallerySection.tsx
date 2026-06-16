"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CategoryItem, GalleryItem, PortfolioLabels } from "@/data/site";
import { GalleryModal } from "./GalleryModal";
import { BackToTop } from "./BackToTop";

function getCategoryLabel(labels: PortfolioLabels, category?: string) {
  if (!category) {
    return "";
  }
  return labels.categoryLabels[category] ?? category;
}

function getCategoryCount(category: string, gallery: GalleryItem[]) {
  if (category === "All") {
    return gallery.length;
  }
  return gallery.filter((item) => item.category === category).length;
}

function getRole(item: GalleryItem, labels: PortfolioLabels) {
  return item.role ?? getCategoryLabel(labels, item.category);
}

function getColor(item: GalleryItem, labels: PortfolioLabels) {
  return item.colorPalette ?? labels.tbd;
}

function getDate(item: GalleryItem, labels: PortfolioLabels) {
  return item.createdAt ?? labels.tbd;
}

function ArtworkImage({
  item,
  priority = false,
  variant,
}: {
  item: GalleryItem;
  priority?: boolean;
  variant: "featured" | "card";
}) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-slate-950/55 ${
        isFeatured
          ? "min-h-[15rem] p-4 sm:min-h-[18rem] md:m-4 md:min-h-[24rem] md:rounded-[22px] md:border md:border-white/10 xl:min-h-[28rem]"
          : "min-h-[11.5rem] p-3 sm:min-h-60 xl:min-h-72"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 blur-md">
        <Image
          src={item.thumbnail}
          alt=""
          aria-hidden="true"
          fill
          className="scale-110 object-cover"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 68vw"
              : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          }
        />
      </div>
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={item.width}
        height={item.height}
        priority={priority}
        className={`relative z-[1] h-auto w-auto max-w-full object-contain transition duration-300 group-hover:scale-[1.015] ${
          isFeatured ? "max-h-[24rem] md:max-h-[34rem]" : "max-h-[14.5rem] sm:max-h-72"
        }`}
        sizes={
          isFeatured
            ? "(max-width: 768px) 100vw, 68vw"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/10" />
    </div>
  );
}

export function GallerySection({
  categories,
  gallery,
  labels,
}: {
  categories?: CategoryItem[];
  gallery: GalleryItem[];
  labels: PortfolioLabels;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const allCategories = useMemo(
    () => {
      const usedCategories = new Set(
        gallery
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category)),
      );

      const managedCategories = categories
        ?.map((category) => category.id)
        .filter((category) => usedCategories.has(category));

      return [
        "All",
        ...(managedCategories?.length ? managedCategories : [...usedCategories]),
      ];
    },
    [categories, gallery],
  );

  const filtered = useMemo(() => {
    return gallery.filter((item) => {
      return activeCategory === "All" || item.category === activeCategory;
    });
  }, [activeCategory, gallery]);

  const featuredItem =
    filtered.find((item) => item.featured) ??
    filtered.find((item) => item.category === "Key Visual") ??
    filtered[0] ??
    null;

  const gridItems = featuredItem
    ? filtered.filter((item) => item.id !== featuredItem.id)
    : filtered;

  return (
    <section id="gallery" className="h-full">
      <div className="content-panel gallery-panel relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,40,0.96),rgba(6,10,24,0.84))] p-5 shadow-[0_18px_40px_rgba(5,8,20,0.32)] md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(165,180,255,0.1),transparent_20%),radial-gradient(circle_at_86%_10%,rgba(108,230,255,0.1),transparent_18%)]" />
        <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

        <div className="relative flex items-end justify-between gap-3">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.34em] text-blue-200/80">
              {labels.galleryEyebrow.toUpperCase()}
            </p>
            <h3 className="text-[2rem] font-semibold text-white md:text-[2.35rem]">
              {labels.galleryTitle}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {labels.galleryDescription}
            </p>
          </div>
          <div className="hidden rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-blue-100/70 md:block">
            {labels.ongoingArchive}
          </div>
        </div>

        <div className="relative mt-5 space-y-4">
          {featuredItem ? (
            <motion.button
              key={featuredItem.id}
              type="button"
              whileHover={{ y: -2, scale: 1.01 }}
              onClick={() => setSelected(featuredItem)}
              className="artwork-card group relative grid w-full overflow-hidden rounded-[24px] border border-white/12 bg-slate-950/35 text-left shadow-[0_16px_36px_rgba(4,8,18,0.24)] md:grid-cols-[minmax(360px,1.15fr)_minmax(260px,0.55fr)] md:rounded-[26px]"
            >
              <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[11px] tracking-[0.22em] text-blue-100/75">
                {labels.featured.toUpperCase()}
              </span>
              <ArtworkImage item={featuredItem} priority variant="featured" />
              <div className="relative flex flex-col justify-center gap-4 border-t border-white/10 p-4 md:border-t-0 md:p-6">
                <div className="space-y-3">
                  {featuredItem.category ? (
                    <span className="inline-flex rounded-full border border-white/12 bg-white/7 px-3 py-1 text-[11px] tracking-[0.16em] text-blue-100/80">
                      {getCategoryLabel(labels, featuredItem.category)}
                    </span>
                  ) : null}
                  <h4 className="text-2xl font-semibold text-blue-50 md:text-3xl">
                    {featuredItem.title}
                  </h4>
                  {featuredItem.description ? (
                    <p className="[display:-webkit-box] max-w-2xl overflow-hidden text-sm leading-6 text-slate-200/86 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-[15px] md:leading-7">
                      {featuredItem.description}
                    </p>
                  ) : null}
                </div>
                <dl className="hidden grid-cols-2 gap-2 text-sm md:grid">
                  {[
                    [labels.character, getCategoryLabel(labels, featuredItem.category)],
                    [labels.color, getColor(featuredItem, labels)],
                    [labels.type, getRole(featuredItem, labels)],
                    [labels.date, getDate(featuredItem, labels)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[16px] border border-white/10 bg-black/16 p-3"
                    >
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-blue-200/52">
                        {label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-blue-50">{value}</dd>
                    </div>
                  ))}
                </dl>
                {featuredItem.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {featuredItem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] text-blue-50/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <span className="inline-flex w-fit rounded-full border border-blue-200/28 bg-blue-300/14 px-4 py-2 text-sm font-semibold text-blue-50 transition group-hover:bg-blue-300/22">
                  {labels.viewDetails}
                </span>
              </div>
            </motion.button>
          ) : null}

          <div className="category-bar rounded-[22px] border border-white/10 bg-black/16 p-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 overflow-hidden rounded-[18px] border border-white/8 bg-slate-950/28 p-1.5">
              {allCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  title={labels.categoryNotes[category] ?? category}
                  aria-pressed={activeCategory === category}
                  className={`category-button min-w-0 flex-1 rounded-[14px] border px-2.5 py-2 text-xs transition sm:text-sm md:flex-none md:px-3.5 ${
                    activeCategory === category
                      ? "border-blue-200/45 bg-[linear-gradient(180deg,rgba(117,164,255,0.38),rgba(72,108,179,0.22))] text-white shadow-[0_0_18px_rgba(103,149,255,0.16)]"
                      : "border-transparent bg-transparent text-blue-100/72 hover:bg-white/8 hover:text-blue-50"
                  }`}
                >
                  <span className="block truncate sm:hidden">
                    {labels.categoryShortLabels[category] ?? getCategoryLabel(labels, category)}
                  </span>
                  <span className="hidden sm:inline">{getCategoryLabel(labels, category)}</span>
                  <span className="ml-1.5 text-xs text-blue-100/58">
                    {getCategoryCount(category, gallery)}
                  </span>
                </button>
              ))}
            </div>

            {/* category description removed */}
          </div>

          {gridItems.length ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gridItems.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  onClick={() => setSelected(item)}
                  className="artwork-card group relative overflow-hidden rounded-[22px] border border-white/12 bg-slate-950/35 text-left shadow-[0_16px_36px_rgba(4,8,18,0.24)] transition hover:border-blue-200/42 md:rounded-[24px]"
                >
                  <span className="pointer-events-none absolute left-4 top-4 z-10 hidden rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[11px] tracking-[0.22em] text-blue-100/75 md:block">
                    {labels.work.toUpperCase()}
                  </span>
                  <span className="pointer-events-none absolute right-4 top-4 z-10 hidden rounded-full border border-blue-200/28 bg-blue-300/14 px-3 py-1.5 text-xs font-semibold text-blue-50 opacity-0 shadow-[0_0_18px_rgba(103,149,255,0.16)] transition group-hover:opacity-100 md:inline-flex">
                    {labels.viewDetails}
                  </span>
                  <ArtworkImage item={item} variant="card" />
                  <div className="space-y-2 border-t border-white/10 p-3.5 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="[display:-webkit-box] overflow-hidden text-lg font-semibold leading-[1.3] text-blue-50 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-xl">
                        {item.title}
                      </p>
                      {item.category ? (
                        <span className="shrink-0 rounded-full border border-white/12 bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.16em] text-blue-100/80">
                          {getCategoryLabel(labels, item.category)}
                        </span>
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="[display:-webkit-box] overflow-hidden text-sm leading-6 text-slate-300/86 [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {item.description}
                      </p>
                    ) : null}
                    {item.tags?.length ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] text-blue-50/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/12 bg-black/14 px-5 py-10 text-center">
              <p className="text-sm tracking-[0.22em] text-blue-200/58">
                {labels.noWorksTitle.toUpperCase()}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300/88">
                {labels.noWorksDescription}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <BackToTop label={labels.backToTop} />
        </div>
      </div>

      <GalleryModal item={selected} labels={labels} onClose={() => setSelected(null)} />
    </section>
  );
}
