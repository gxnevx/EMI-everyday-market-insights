# EMI — Everyday Market Insights

Minimal, mobile-first AI & tech news reader. Bilingual (EN/PT). Dark mode. Free.

![EMI](public/icon-512.png)

---

## Features

- **News** — AI/tech headlines from top sources via NewsAPI.org
- **Insights** — Deep reads from VC firms & AI lab blogs via RSS
- **Impact score** — 1-10 rating per article based on market signals
- **Filters** — Toggle categories: AI Models, AI Products, Big Tech, Funding, Regulation, Research, Infra
- **Dark mode** — Toggle between light cream and dark themes
- **Bilingual** — Switch between English and Portuguese (auto-translated)
- **Swipe navigation** — Swipe left/right to switch tabs, swipe right to go back from articles
- **Share to LinkedIn** — One-tap sharing from any article
- **Inline reading** — Articles open inside the app with full content extraction

---

## News Sources (via NewsAPI.org)

TechCrunch · The Verge · Wired · Ars Technica · MIT Tech Review · Reuters · Bloomberg · CNBC · NYT · WSJ · Financial Times · Axios · VentureBeat · Semafor · The Information

## Insight Sources (via RSS)

a16z · Sequoia Capital · Greylock · OpenAI · Anthropic · DeepMind · Google AI · Microsoft AI · NVIDIA · Meta AI · Hugging Face · Benedict Evans · Stratechery · Import AI · The Batch · The Pragmatic Engineer

---

## Setup

### 1. Get a NewsAPI.org key

1. Go to [newsapi.org/register](https://newsapi.org/register)
2. Create a free account
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
3. Shows as "EMI" with the logo

---

## Project Structure

```
app/
  page.js                       → Main app (tabs, swipe, filters, dark mode)
  layout.js                     → Root layout + PWA meta tags
  globals.css                   → Styles + dark mode CSS
  api/fetch-news/route.js       → NewsAPI.org fetch + score calculation
  api/fetch-insights/route.js   → RSS feed parser for insights
  api/fetch-article/route.js    → Full article content extractor
  api/translate/route.js        → Batch translation via Google Translate

components/
  Card.jsx                      → Article card in feed list
  ArticleView.jsx               → Full article reading view
  FilterPanel.jsx               → Category filter toggles

lib/
  constants.js                  → All RSS feeds + UI labels (PT/EN)
  keywords.js                   → Filter categories + keyword matching
  score.js                      → Impact score calculator
  fetchFeeds.js                 → RSS parser
  helpers.js                    → Filter + batch translate utils
  translate.js                  → Google Translate wrapper
  dates.js                      → Date formatting
  useSwipe.js                   → Touch swipe gesture hook
  useRefreshCounter.js          → Daily API call counter
  useDarkMode.js                → Dark/light mode toggle

public/
  manifest.json + icons         → PWA config for iPhone shortcut
```

---

## Customize

- **Add/remove news sources** → NewsAPI `domains` param in `app/api/fetch-news/route.js`
- **Add/remove insight feeds** → `INSIGHT_FEEDS` in `lib/constants.js`
- **Change filter categories** → `CATEGORIES` in `lib/keywords.js`
- **Change colors** → `tailwind.config.js` + `app/globals.css`
- **Change news query** → `QUERY` in `app/api/fetch-news/route.js`

---

## Stack

Next.js 14 · Tailwind CSS · rss-parser · NewsAPI.org · Vercel

---

## Cost

- **Vercel** — free tier
- **NewsAPI.org** — free tier (1,000 requests/period, 30 min cache = ~48 calls/day max)
- **RSS feeds** — free, unlimited
- **Translation** — free (Google Translate API)

---

## License

Personal use.
