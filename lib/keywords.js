export const CATEGORIES = {
  "AI Models": [
    "\\bGPT\\b", "\\bLLM\\b", "large language model", "\\bClaude\\b",
    "\\bGemini\\b", "\\bLlama\\b", "\\bMistral\\b", "foundation model",
    "AI model", "open source model", "fine-tun", "diffusion model",
  ],
  "AI Products": [
    "ChatGPT", "Copilot", "Midjourney", "Stable Diffusion",
    "\\bSora\\b", "Perplexity", "AI agent", "AI assistant",
    "AI search", "AI tool", "AI app", "AI feature",
  ],
  "Big Tech": [
    "OpenAI", "Anthropic", "DeepMind", "Google AI", "\\bMeta AI\\b",
    "Microsoft AI", "NVIDIA", "Apple Intelligence", "Amazon AI",
    "xAI", "\\bGrok\\b", "Samsung AI",
  ],
  "Funding & Deals": [
    "funding", "raises", "Series A", "Series B", "\\bIPO\\b",
    "acquisition", "acquires", "valuation", "venture capital",
    "investment", "merger", "deal", "billion",
  ],
  "Regulation & Policy": [
    "regulation", "antitrust", "ban", "lawsuit", "compliance",
    "EU AI Act", "safety", "governance", "policy", "congress",
    "Senate", "legislation", "executive order",
  ],
  "Research": [
    "research", "paper", "benchmark", "breakthrough", "study",
    "artificial intelligence", "machine learning", "deep learning",
    "neural network", "\\bNLP\\b", "computer vision",
  ],
  "Infra & Chips": [
    "\\bGPU\\b", "AI chip", "inference", "training", "data center",
    "cloud computing", "edge computing", "semiconductor", "\\bTPU\\b",
  ],
  "Robotics": [
    "robot", "robotics", "humanoid", "autonomous", "drone",
    "self-driving", "Boston Dynamics", "Figure",
  ],
  "AI in Business": [
    "enterprise AI", "AI adoption", "automation", "workflow",
    "productivity", "customer service", "healthcare AI", "fintech",
    "AI hiring", "AI jobs", "layoff",
  ],
};

export const ALL_KEYWORDS = Object.values(CATEGORIES).flat();

export function matchesFilter(article, activeCategories = null) {
  const text = `${article.title} ${article.description}`;
  const keywords = activeCategories
    ? activeCategories.flatMap((cat) => CATEGORIES[cat] || [])
    : ALL_KEYWORDS;
  return keywords.some((kw) => {
    try { return new RegExp(kw, "i").test(text); }
    catch { return text.toLowerCase().includes(kw.toLowerCase()); }
  });
}
