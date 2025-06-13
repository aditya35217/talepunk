import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/data/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      category: z.string(),
      contentType: z.string().optional(),
      date: z.coerce.date(),
      hideDay: z.boolean().optional(),
      description: z.string(),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
    }),
});

export const collections = { posts };
