export const website: string = "talepunk";
export const siteName: string = "TalePunk";
export const siteTitle: string =
  "TalePunk - From anime and movies to tech and geopolitics";
export const siteDescription: string =
  "We rant about anime, movies and TV shows, discuss books, manga; and happenings in tech and their wider implications; from story and tech to policy and geopolitics";

export type categoryName = "tech" | "otaku" | "cinema" | "world" | "books" | "movie";
export const categoryInfo: {
  [key: string]: { title: string; description: string };
} = {
  otaku: {
    title: "Anime",
    description:
      "From anime, manga, manhwa..., here we rant about how good they were and sometimes how disappointing 'that' was.",
  },
  cinema: {
    title: "Cinema",
    description:
      "We talk 'nice' about the things we like and try not to hate the things that wasted our time. Get good recommendations, reviews for movies and TV shows.",
  },
  movie: {
    title: "Movie",
    description:
      "We talk 'nice' about the things we like and try not to hate the things that wasted our time. Get good recommendations, reviews for movies and TV shows.",
  },
  world: {
    title: "World",
    description:
      "This is section for what's happening in the world, from policy and economy to geopolitics here we discuss it all.",
  },
  tech: {
    title: "Tech",
    description:
      "Know cool things that have come out, the innovations that have been made and their wider implications; from science, programming to tech.",
  },
  books: {
    title: "Books",
    description:
      "In this noisy world, we need some peace, some words. Here, we discuss books, comment on audiobooks, from fiction and fantasy to politics and philosophy.",
  },
};

export const socialInfo: {
  [key: string]: { url: string; username: string };
} = {
  x: {
    url: "https://x.com/theTalePunk",
    username: "@theTalePunk",
  },
  reddit: {
    url: "https://www.reddit.com/r/TalePunk",
    username: "r/TalePunk",
  },
  instagram: {
    url: "https://www.instagram.com/thetalepunk",
    username: "@thetalepunk",
  },
  threads: {
    url: "https://www.threads.net/@thetalepunk",
    username: "@theTalePunk",
  },
  mastodon: {
    url: "https://mastodon.social/@TalePunk",
    username: "@TalePunk",
  },
  pinterest: {
    url: "https://www.pinterest.com/TalePunk/",
    username: "@TalePunk",
  },
  rss: {
    url: "/feed/",
    username: "Our RSS feed",
  },
};

export const dotMenuMap: { [key: string]: string } = {
  "content-index": "Content Index",
  about: "About",
};

export const contentTypeInfo: {
  [key: string]: { title: string; description: string };
} = {
  news: {
    title: "News",
    description:
      "Get relevant updates about anime, movies, politics and happenings in tech. Stay away from 'news noise'.",
  },
  review: {
    title: "Review",
    description:
      "Reviews of movies, anime, tv-series, manga, books, audiobooks and tech",
  },
  list: {
    title: "List",
    description:
      "Get recommandations for books, audiobooks, anime, manga, moovis and tv-shows",
  },
};
