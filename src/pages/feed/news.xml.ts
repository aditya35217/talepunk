import rss from "@astrojs/rss";
import { getPosts } from "../../components/getPosts";
import { siteName, categoryInfo, contentTypeInfo } from "../../consts";
import { getImage } from "astro:assets";

export async function GET(context: any) {
  const contentType = "news";
  const contentTypeTitle = contentTypeInfo[contentType].title;
  const posts = (await getPosts("all"))
    .filter((post) => post.data.contentType === contentType)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 20);
  const items = await Promise.all(
    posts.map(async (post) => {
      const image = new URL(
        (await getImage({ src: post.data.image })).src,
        context.site,
      );
      const categoryTitle = categoryInfo[post.data.category].title;
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        customData: `
        <category domain="${context.site}tag/">${post.data.tags[0]}</category>    
        <category>${contentTypeTitle}</category>           
        <category>${categoryTitle}</category>
         <enclosure type="image/webp" length="0" url="${image}" />`,
        link: `/${post.data.category}/${post.id}/`,
      };
    }),
  );

  const atomLink = new URL(`feed/${contentType}.xml`, context.site);

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },

    title: `${contentTypeTitle} - ${siteName}`,
    description: contentTypeInfo[contentType].description,
    site: new URL(contentType, context.site),
    customData: `<atom:link href="${atomLink}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <category>${contentTypeTitle}</category>`,
    items,
  });
}
