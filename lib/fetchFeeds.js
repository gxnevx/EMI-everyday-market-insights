import Parser from "rss-parser";

const parser = new Parser();

export async function fetchFeeds(feeds, limit = 5) {
  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      const data = await parser.parseURL(feed.url);
      return (data.items || []).slice(0, limit).map((item) => ({
        title: item.title || "",
        description: item.contentSnippet?.slice(0, 200) || "",
        source: feed.name,
        author: item.creator || item.author || "",
        publishedAt: item.isoDate || item.pubDate || "",
        urlToImage: item.enclosure?.url || "",
        url: item.link || "",
      }));
    })
  );

  return results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}
