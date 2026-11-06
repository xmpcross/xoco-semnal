// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import { siteConfig } from "./src/config/site.ts";

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
