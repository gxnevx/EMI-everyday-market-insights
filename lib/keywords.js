// Keywords to filter articles. Only articles matching at least one keyword
// in the title or description will show up. Case-insensitive.
// Edit this list to change what you see.

export const KEYWORDS = [
  // AI & ML
  "artificial intelligence", "AI", "machine learning", "deep learning",
  "LLM", "large language model", "generative AI", "gen AI",
  "GPT", "Claude", "Gemini", "Llama", "Mistral", "OpenAI", "Anthropic",
  "DeepMind", "neural network", "transformer", "diffusion model",
  "computer vision", "NLP", "natural language",
  // AI products & infra
  "ChatGPT", "Copilot", "Midjourney", "Stable Diffusion", "Sora",
  "AI agent", "AI startup", "AI funding", "AI chip", "AI model",
  "GPU", "NVIDIA", "inference", "training", "fine-tuning",
  // Telecom & 5G (your Huawei side)
  "5G", "5G core", "RAN", "FWA", "RedCap", "Open RAN",
  "telecom", "telco", "wireless", "spectrum",
  // SaaS & market
  "SaaS", "startup", "venture capital", "Series A", "Series B",
  "IPO", "acquisition", "funding round", "valuation",
  // Tech trends
  "robotics", "autonomous", "quantum computing", "edge computing",
  "cloud computing", "cybersecurity", "blockchain",
];

// Check if an article matches any keyword
export function matchesFilter(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
}
