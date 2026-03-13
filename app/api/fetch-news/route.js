import { calculateScore } from "@/lib/score";

const API_KEY = process.env.NEWS_API_KEY || "";
const BASE = "https://newsapi.org/v2/everything";

// Tight query: must mention specific AI terms, not just "AI"
const QUERY = '("artificial intelligence" OR "generative AI" OR ChatGPT OR OpenAI OR Anthropic OR "large language model" OR LLM OR GPT OR "AI startup" OR "AI model" OR "machine learning" OR DeepMind OR Gemini OR "AI agent")';

// Only quality tech/business sources
const DOMAINS = "techcrunch.com,theverge.com,wired.com,arstechnica.com,technologyreview.com,reuters.com,bloomberg.com,cnbc.com,nytimes.com,wsj.com,ft.com,axios.com,venturebeat.com,semafor.com,theinformation.com";

export const revalidate = 1800; // 30 min cache to save API calls

export async function GET() {
  if (!API_KEY) {
    return Response.json({ articles: [], error: "No NEWS_API_KEY set" }, { status: 400 });
  }

  const params = new URLSearchParams({
    q: QUERY,
    domains: DOMAINS,
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
