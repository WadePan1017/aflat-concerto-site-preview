import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default defineConfig({
  name: "aflat_concerto_portfolio",
  title: "AFlatConcerto 网站后台",
  projectId,
  dataset,
  basePath: `${basePath}/studio`,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter(
        (template) =>
          template.id !== "artwork" && template.id !== "artworkCategory",
      ),
      {
        id: "artwork-by-site",
        title: "新增作品",
        schemaType: "artwork",
        parameters: [{ name: "siteKey", type: "string" }],
        value: ({ siteKey }: { siteKey?: string }) => ({
          siteKey: siteKey || "main",
          displayOrder: 100,
          featured: false,
        }),
      },
      {
        id: "artwork-category-by-site",
        title: "新增稿件分类",
        schemaType: "artworkCategory",
        parameters: [{ name: "siteKey", type: "string" }],
        value: ({ siteKey }: { siteKey?: string }) => ({
          siteKey: siteKey || "main",
          displayOrder: 100,
        }),
      },
    ],
  },
});
