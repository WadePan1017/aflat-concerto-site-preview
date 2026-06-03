import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("网站后台")
    .items([
      S.listItem()
        .id("portfolioSite")
        .title("站点内容")
        .schemaType("portfolioSite")
        .child(
          S.document()
            .schemaType("portfolioSite")
            .documentId("portfolioSite-main")
            .id("portfolioSite-main")
            .title("站点内容（main）"),
        ),
      S.divider(),
      S.documentTypeListItem("artwork").id("artwork").title("作品管理"),
    ]);
