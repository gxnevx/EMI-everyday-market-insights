# EMI — Everyday Market Insights

Minimal, mobile-first AI & tech news reader. Bilingual (EN/PT). Zero cost.

![EMI](public/icon-512.png)

---

## Sources

### News
TechCrunch · The Verge · Ars Technica · Wired · MIT Tech Review · CNBC · Bloomberg · Reuters · NYT · WSJ · The Economist · Axios · Hacker News

### Insights
a16z · Sequoia Capital · Greylock · OpenAI · Anthropic · DeepMind · Meta AI · Hugging Face · Benedict Evans · Stratechery · Import AI · The Batch · The Pragmatic Engineer

All via RSS. No API keys. No rate limits.

---

## Stack

Next.js 14 · Tailwind CSS · rss-parser · Vercel (free tier)

---

## Structure

```
lib/
  constants.js    → All RSS feeds + UI labels. Edit here to add/remove sources.
  fetchFeeds.js   → Shared RSS parser.
  dates.js        → Date formatting.

components/
  FeedPage.jsx    → Reusable page (nav + card list).
  Card.jsx        → Article card (image, title, source, author, date).

app/
  page.js                       → Redirects to /news.
  layout.js                     → Root layout + PWA meta.
  news/page.js                  → News page.
  insights/page.js              → Insights page.
  api/fetch-news/route.js       → Parses NEWS_FEEDS.
  api/fetch-insights/route.js   → Parses INSIGHT_FEEDS.

public/
  manifest.json + icons         → PWA (iPhone home screen shortcut).
```

---

## Deploy

1. Import this repo on [vercel.com](https://vercel.com)
2. No env variables needed
3. Deploy

### Add to iPhone

1. Open the URL in Safari
2. Share → Add to Home Screen
3. Shows as "EMI" with the logo

---

## Customize

Add/remove sources → `lib/constants.js`

---

## Cost

$0. RSS feeds are free and unlimited.
