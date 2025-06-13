import rss from "@astrojs/rss";
import { getPosts } from "../../components/getPosts";
import { siteName, categoryInfo, contentTypeInfo } from "../../consts";
import { getImage } from "astro:assets";

export async function getStaticPaths() {
  return Object.keys(categoryInfo).map((category) => ({
    params: { category: category },
  }));
}

export async function GET(context: any) {
  const category = context.params.category.replace(".xml", "");
  const categoryTitle = categoryInfo[category].title;
  const posts = (await getPosts(category))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 15);
  const items = await Promise.all(
    posts.map(async (post) => {
      const image = new URL(
        (await getImage({ src: post.data.image })).src,
        context.site,
      );
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        customData: `        
        <category domain="${context.site}tag/">${post.data.tags[0]}</category>
        ${
          post.data.contentType !== undefined
            ? `<category>${contentTypeInfo[post.data.contentType].title}</category>`
            : ""
        }
        <category>${categoryTitle}</category>
        <enclosure type="image/webp" length="0" url="${image}" />`,
        link: `/${post.data.category}/${post.id}/`,
      };
    }),
  );

  const atomLink = new URL(`feed/${category}.xml`, context.site);

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    title: `${categoryTitle} - ${siteName}`,
    description: categoryInfo[category].description,
    site: new URL(category, context.site),
    customData: `<atom:link href="${atomLink}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <category>${categoryTitle}</category>`,
    items,
  });
}
