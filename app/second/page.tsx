import { PortfolioShell } from "@/components/PortfolioShell";
import type { Language, SiteContent } from "@/data/site";
import { fetchSiteContent } from "@/sanity/queries";

const languages: Language[] = ["en", "zh"];

export default async function SecondSitePage() {
  const entries = await Promise.all(
    languages.map(
      async (language) =>
        [language, await fetchSiteContent(language, "second")] as const,
    ),
  );

  return (
    <PortfolioShell
      contentByLanguage={Object.fromEntries(entries) as Record<Language, SiteContent>}
    />
  );
}
