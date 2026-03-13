// Free translation using Google Translate URL
// Translates text to target language, returns translated string

export async function translate(text, to = "pt") {
  if (!text || to === "en") return text;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${to}&dt=t&q=${encodeURIComponent(text.slice(0, 4000))}`;
    const res = await fetch(url);
    const data = await res.json();

    // Google returns nested arrays: [[["translated", "original"], ...]]
    return data[0].map((chunk) => chunk[0]).join("");
  } catch {
    return text; // fallback to original if translation fails
  }
}
