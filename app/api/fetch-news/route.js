import { calculateScore } from "@/lib/score";

const API_KEY = process.env.NEWS_API_KEY || "";
const BASE = "https://newsapi.org/v2/everything";
const QUERY = "(artificial intelligence OR AI startup OR generative AI OR LLM OR OpenAI OR Anthropic OR DeepMind OR AI funding OR AI launch)";

export const revalidate = 900; // 15 min cache

export async function GET() {
  if (!API_KEY) {
    return Response.json({ articles: [], error: "No NEWS_API_KEY set" }, { status: 400 });
  }

  const params = new URLSearchParams({
    q: QUERY,
    sortBy: "publishedAt",
    pageSize: "30",
    language: "en",
    apiKey: API_KEY,
  });

  try {
    const res = await fetch(`${BASE}?${params}`);
    const data = await res.json();

    if (data.status !== "ok") {
      return Response.json({ articles: [], error: data.message }, { status: 500 });
    }

    const articles = (data.articles || [])
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a) => ({
        title: a.title,
        description: a.description || "",
        source: a.source?.name || "",
        author: a.author || "",
        publishedAt: a.publishedAt || "",
        urlToImage: a.urlToImage || "",
        url: a.url || "",
        score: calculateScore({
          title: a.title,
          description: a.description || "",
          source: a.source?.name || "",
        }),
      }));

    return Response.json({ articles });
  } catch (e) {
    return Response.json({ articles: [], error: e.message }, { status: 500 });
  }
}
