import { fetchFeeds } from "@/lib/fetchFeeds";
import { NEWS_FEEDS } from "@/lib/constants";

export async function GET() {
  try {
    const articles = await fetchFeeds(NEWS_FEEDS, 15, true);
    return Response.json({ articles });
  } catch (e) {
    return Response.json({ articles: [], error: e.message }, { status: 500 });
  }
}
