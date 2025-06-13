import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import partytown from "@astrojs/partytown";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://talepunk.com/",
  trailingSlash: "always",
  integrations: [
    tailwind(),
    sitemap(),
    icon(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    solidJs(),
  ],
});