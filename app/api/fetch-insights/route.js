import { fetchFeeds } from "@/lib/fetchFeeds";
import { INSIGHT_FEEDS } from "@/lib/constants";

export async function GET() {
  try {
    const articles = await fetchFeeds(INSIGHT_FEEDS, 5);
    return Response.json({ articles });
  } catch (e) {
    return Response.json({ articles: [], error: e.message }, { status: 500 });
  }
}
