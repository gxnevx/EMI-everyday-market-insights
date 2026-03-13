// Calculates a 1-10 impact score based on content signals.
// Higher score = more market-relevant / impactful.

const HIGH_IMPACT = [
  "funding", "acquisition", "IPO", "billion", "million", "raises",
  "launch", "announce", "breakthrough", "regulation", "ban", "approve",
  "partnership", "merger", "layoff", "shutdown", "Series A", "Series B",
  "Series C", "valuation", "antitrust", "lawsuit",
];

const MEDIUM_IMPACT = [
  "release", "update", "new model", "benchmark", "open source",
  "API", "platform", "product", "feature", "beta", "preview",
  "research", "paper", "study", "report", "forecast",
];

// Sources with higher editorial weight
const TOP_SOURCES = [
  "Bloomberg Tech", "Reuters", "NYT Tech", "WSJ Tech",
  "The Economist", "MIT Tech Review", "a16z", "Sequoia Capital",
  "OpenAI", "Anthropic", "DeepMind",
];

export function calculateScore(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  let score = 3; // base

  // High impact keywords (+2 each, max +4)
  let highHits = HIGH_IMPACT.filter((kw) => text.includes(kw.toLowerCase()));
  score += Math.min(highHits.length * 2, 4);

  // Medium impact keywords (+1 each, max +2)
  let medHits = MEDIUM_IMPACT.filter((kw) => text.includes(kw.toLowerCase()));
  score += Math.min(medHits.length, 2);

  // Source bonus
  if (TOP_SOURCES.includes(article.source)) score += 1;

  return Math.min(Math.max(score, 1), 10);
}
