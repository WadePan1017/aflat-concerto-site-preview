export const managedSites = [
  {
    key: "main",
    orderLabel: "一",
    title: "网站一：AFlatConcerto",
    shortTitle: "AFlatConcerto",
    documentId: "portfolioSite-main",
  },
  {
    key: "second",
    orderLabel: "二",
    title: "网站二：新网站",
    shortTitle: "新网站",
    documentId: "portfolioSite-second",
  },
] as const;

export type ManagedSiteKey = (typeof managedSites)[number]["key"];
