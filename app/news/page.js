"use client";
import FeedPage from "@/components/FeedPage";

export default function NewsPage() {
  return <FeedPage endpoint="/api/fetch-news" section="news" />;
}
