import { fetchFeeds } from "@/lib/fetchFeeds";
import { INSIGHT_FEEDS } from "@/lib/constants";

export const revalidate = 900; // cache for 15 min

export async function GET() {
  try {
    const articles = await fetchFeeds(INSIGHT_FEEDS, 5, false);
    return Response.json({ articles });
  } catch (e) {
    return Response.json({ articles: [], error: e.message }, { status: 500 });
  }
}
