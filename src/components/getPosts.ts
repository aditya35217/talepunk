import type { CollectionEntry } from "astro:content";
import { type categoryName } from "../consts";
import { getCollection } from "astro:content";

const cachedCategory: {
  [key: string]: CollectionEntry<"posts">[] | null;
} = {};

export const getPosts = async (
  category: categoryName | "all",
): Promise<CollectionEntry<"posts">[]> => {
  if (!cachedCategory["all"]) {
    const allPosts = await getCollection("posts", ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true;
    });
    cachedCategory["all"] = allPosts.flat();
  }

  if (category !== "all" && !cachedCategory[category]) {
    cachedCategory[category] = cachedCategory["all"]!.filter(
      (post) => post.data.category === category,
    );
  }

  return cachedCategory[category]!;
};
