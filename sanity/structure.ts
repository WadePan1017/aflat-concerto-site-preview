import type { StructureResolver } from "sanity/structure";
import { managedSites } from "./sites";
import { apiVersion } from "./env";

type SiteMenuTitle = {
  siteKey?: string;
  adminTitle?: string;
  nameZh?: string;
  nameEn?: string;
};

const siteMenuTitlesQuery = `
*[_type == "portfolioSite" && siteKey in $siteKeys]{
  siteKey,
  adminTitle,
  nameZh,
  nameEn
}
`;

function titleForSite(site: (typeof managedSites)[number], titles: SiteMenuTitle[]) {
  const matched = titles.find((item) => item.siteKey === site.key);
  const displayName =
    matched?.adminTitle || matched?.nameZh || matched?.nameEn || site.shortTitle;

  return {
    displayName,
    title: `网站${site.orderLabel}：${displayName}`,
  };
}

export const structure: StructureResolver = async (S, context) => {
  let titles: SiteMenuTitle[] = [];

  try {
    titles = await context
      .getClient({ apiVersion })
      .fetch(siteMenuTitlesQuery, {
        siteKeys: managedSites.map((site) => site.key),
      });
  } catch {
    titles = [];
  }

  return S.list()
    .id("root")
    .title("选择要管理的网站")
    .items(
      managedSites.map((site) => {
        const siteTitle = titleForSite(site, titles);

        return S.listItem()
          .id(`site-${site.key}`)
          .title(siteTitle.title)
          .child(
            S.list()
              .id(`site-${site.key}-menu`)
              .title(siteTitle.title)
              .items([
                S.listItem()
                  .id(`site-${site.key}-home`)
                  .title("首页内容")
                  .schemaType("portfolioSite")
                  .child(
                    S.document()
                      .id(site.documentId)
                      .schemaType("portfolioSite")
                      .documentId(site.documentId)
                      .title(`${siteTitle.displayName} - 首页内容`),
                  ),
                S.listItem()
                  .id(`site-${site.key}-categories`)
                  .title("稿件分类")
                  .schemaType("artworkCategory")
                  .child(
                    S.documentTypeList("artworkCategory")
                      .id(`artwork-category-${site.key}`)
                      .title(`${siteTitle.displayName} - 稿件分类`)
                      .filter("_type == 'artworkCategory' && siteKey == $siteKey")
                      .params({ siteKey: site.key })
                      .initialValueTemplates([
                        S.initialValueTemplateItem("artwork-category-by-site", {
                          siteKey: site.key,
                        }),
                      ]),
                  ),
                S.listItem()
                  .id(`site-${site.key}-artworks`)
                  .title("作品管理")
                  .schemaType("artwork")
                  .child(
                    S.documentTypeList("artwork")
                      .id(`artwork-${site.key}`)
                      .title(`${siteTitle.displayName} - 作品管理`)
                      .filter("_type == 'artwork' && siteKey == $siteKey")
                      .params({ siteKey: site.key })
                      .initialValueTemplates([
                        S.initialValueTemplateItem("artwork-by-site", {
                          siteKey: site.key,
                        }),
                      ]),
                  ),
              ]),
          );
      }),
    );
};
