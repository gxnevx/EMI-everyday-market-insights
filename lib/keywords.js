export const CATEGORIES = {
  "AI & ML": [
    "artificial intelligence", "\\bAI\\b", "machine learning", "deep learning",
    "\\bLLM\\b", "large language model", "generative AI", "\\bgen AI\\b",
    "neural network", "\\btransformer\\b", "diffusion model",
    "computer vision", "\\bNLP\\b",
  ],
  "AI Companies": [
    "\\bGPT\\b", "\\bClaude\\b", "\\bGemini\\b", "\\bLlama\\b", "\\bMistral\\b",
    "OpenAI", "Anthropic", "DeepMind", "ChatGPT", "Copilot",
    "Midjourney", "Stable Diffusion", "\\bSora\\b", "Perplexity",
    "Hugging Face", "\\bMeta AI\\b", "Google AI",
  ],
  "AI Infra": [
    "AI chip", "AI model", "\\bGPU\\b", "NVIDIA", "\\binference\\b",
    "fine-tuning", "AI agent", "AI startup", "AI funding",
  ],
  "Startups & VC": [
    "\\bSaaS\\b", "startup", "venture capital", "Series A", "Series B",
    "\\bIPO\\b", "acquisition", "funding round", "valuation",
  ],
  "Tech Trends": [
    "robotics", "autonomous", "quantum computing",
    "cloud computing", "cybersecurity",
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
