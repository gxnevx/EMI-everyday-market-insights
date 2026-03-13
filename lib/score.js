// Impact score 1-10. Starts at 1, earns points from signals.

const SIGNALS = {
  // Major events (+3 each)
  major: [
    "billion", "acquisition", "acquires", "IPO", "antitrust", "banned",
    "regulation", "breakthrough", "shutdown", "layoffs", "Series C",
    "Series D", "bankrupt", "investigate", "lawsuit",
  ],
  // Business moves (+2 each)
  business: [
    "funding", "raises", "Series A", "Series B", "valuation", "merger",
    "partnership", "deal", "invest", "revenue", "profit", "loss",
    "launch", "launches", "unveil", "announces", "expansion",
  ],
  // Product/tech (+1 each)
  product: [
    "release", "model", "benchmark", "open source", "API", "update",
    "feature", "beta", "preview", "upgrade", "version",
  ],
  // Named players (+2 — if a big name is involved, it matters more)
  players: [
    "OpenAI", "Google", "Microsoft", "Apple", "NVIDIA", "Meta",
    "Anthropic", "Amazon", "Tesla", "Samsung", "Mistral",
  ],
};

const TOP_SOURCES = [
  "Bloomberg", "Reuters", "The New York Times", "Wall Street Journal",
  "Financial Times", "The Verge", "TechCrunch", "Wired", "Axios",
  "MIT Technology Review", "VentureBeat", "CNBC", "Ars Technica",
];

export function calculateScore(article) {
  const text = `${article.title} ${article.description}`;
  let pts = 0;

  SIGNALS.major.forEach((kw) => { if (text.toLowerCase().includes(kw.toLowerCase())) pts += 3; });
  SIGNALS.business.forEach((kw) => { if (text.toLowerCase().includes(kw.toLowerCase())) pts += 2; });
  SIGNALS.product.forEach((kw) => { if (text.toLowerCase().includes(kw.toLowerCase())) pts += 1; });
  SIGNALS.players.forEach((kw) => { if (text.includes(kw)) pts += 2; });

  if (TOP_SOURCES.some((s) => (article.source || "").includes(s))) pts += 1;

  // Map points to 1-10 scale
  if (pts >= 12) return 10;
  if (pts >= 10) return 9;
  if (pts >= 8) return 8;
  if (pts >= 6) return 7;
  if (pts >= 5) return 6;
  if (pts >= 4) return 5;
  if (pts >= 3) return 4;
  if (pts >= 2) return 3;
  if (pts >= 1) return 2;
  return 1;
}
