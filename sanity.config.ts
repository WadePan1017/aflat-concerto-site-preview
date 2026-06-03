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
  },
});
