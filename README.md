# ¶ EMI — Everyday Market Insights

Minimal, mobile-first AI & tech news reader. Bilingual (EN/PT). Dark mode. Free.

<p align="center">
  <img src="public/icon-512.png" width="128" alt="EMI" />
</p>

---

## Features

- **News** — AI/tech headlines from top sources via NewsAPI.org
- **Insights** — Deep reads from VC firms & AI lab blogs via RSS
- **Impact score** — 1-10 rating per article based on market signals
- **Filters** — Toggle: AI Models, AI Products, Big Tech, Funding, Regulation, Research, Infra, Robotics, AI in Business
- **Dark mode** — Toggle between light and dark themes
- **Bilingual** — EN/PT with auto-translated titles and articles
- **Swipe navigation** — Left/right between tabs, right to go back from articles
- **Pull to refresh** — Swipe down to refresh with spinning indicator
- **Sticky nav** — Menu stays fixed while scrolling
- **Share to LinkedIn** — One-tap sharing from any article
- **Inline reading** — Articles open inside the app with full content extraction
- **PWA** — Add to iPhone/Android home screen as a native-like app

---

## News Sources (via NewsAPI.org)

TechCrunch · The Verge · Wired · Ars Technica · MIT Tech Review · Reuters · Bloomberg · CNBC · NYT · WSJ · Financial Times · Axios · VentureBeat · Semafor · The Information

## Insight Sources (via RSS)

a16z · Sequoia Capital · Greylock · OpenAI · Anthropic · DeepMind · Google AI · Microsoft AI · NVIDIA · Meta AI · Hugging Face · Benedict Evans · Stratechery · Import AI · The Batch · The Pragmatic Engineer

---

## Setup

### 1. Get a NewsAPI.org key

1. Go to [newsapi.org/register](https://newsapi.org/register)
2. Create a free account (1,000 requests/day)
3. Copy your API key

### 2. Deploy to Vercel

1. Fork or clone this repo
2. Go to [vercel.com](https://vercel.com) → Add New Project → import the repo
3. In **Environment Variables**, add:
   - Name: `NEWS_API_KEY`
   - Value: your API key from step 1
4. Click **Deploy**

### 3. Add to iPhone home screen

1. Open the Vercel URL in Safari
2. Tap Share → Add to Home Screen
3. Shows as "EMI" with the ¶ pilcrow icon

---

## Project Structure

```
app/
  page.js                       → Main app (tabs, swipe, pull-refresh, filters, dark mode)
  layout.js                     → Root layout + PWA meta tags
  globals.css                   → Styles + dark mode + pull spinner
  api/fetch-news/route.js       → NewsAPI.org (restricted to top sources, 30min cache)
  api/fetch-insights/route.js   → RSS feed parser
  api/fetch-article/route.js    → Full article content extractor
  api/translate/route.js        → Batch translation via Google Translate

components/
  Card.jsx                      → Article card in feed list
  ArticleView.jsx               → Full article reading view + LinkedIn share
  FilterPanel.jsx               → Category filter toggles

lib/
  constants.js                  → RSS feeds + UI labels (PT/EN)
  keywords.js                   → 9 filter categories + keyword matching
  score.js                      → Impact score calculator (signals + source weight)
  fetchFeeds.js                 → RSS parser
  helpers.js                    → Filter + batch translate utils
  translate.js                  → Google Translate wrapper
  dates.js                      → Date formatting
  useSwipe.js                   → Touch swipe gesture hook
  usePullRefresh.js             → Pull to refresh hook
  useRefreshCounter.js          → Daily API call counter (localStorage)
  useDarkMode.js                → Dark/light mode toggle

public/
  manifest.json                 → PWA config
  apple-touch-icon.png          → 180px icon (¶ pilcrow)
  icon-192.png                  → 192px icon
  icon-512.png                  → 512px icon
  favicon.ico                   → Browser tab icon
```

---

## Customize

- **News sources** → `domains` param in `app/api/fetch-news/route.js`
- **News query** → `QUERY` in `app/api/fetch-news/route.js`
- **Insight feeds** → `INSIGHT_FEEDS` in `lib/constants.js`
- **Filter categories** → `CATEGORIES` in `lib/keywords.js`
- **Colors** → `tailwind.config.js` + `app/globals.css`

---

## Stack

Next.js 14 · Tailwind CSS · rss-parser · NewsAPI.org · Vercel

## Cost

$0.

- **Vercel** — free tier
- **NewsAPI.org** — free tier (1,000 requests/day, 30min server cache)
- **RSS feeds** — free, unlimited
- **Translation** — free (Google Translate)
