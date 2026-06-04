import { PortfolioShell } from "@/components/PortfolioShell";
import type { Language, SiteContent } from "@/data/site";
import { fetchSiteContent } from "@/sanity/queries";

const languages: Language[] = ["en", "zh"];

export default async function Home() {
  const entries = await Promise.all(
    languages.map(async (language) => [language, await fetchSiteContent(language)] as const),
  );

  return (
    <PortfolioShell
      contentByLanguage={Object.fromEntries(entries) as Record<Language, SiteContent>}
      siteKey="main"
    />
  );
}
