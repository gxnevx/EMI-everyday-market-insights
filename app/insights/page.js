"use client";
import FeedPage from "@/components/FeedPage";

export default function InsightsPage() {
  return <FeedPage endpoint="/api/fetch-insights" section="insights" />;
}
