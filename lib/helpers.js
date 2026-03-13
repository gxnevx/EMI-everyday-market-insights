import { CATEGORIES } from "@/lib/keywords";

export function applyFilter(articles, filters) {
  const kws = filters.flatMap((c) => CATEGORIES[c] || []);
  return articles.filter((a) => {
    const text = `${a.title} ${a.description}`;
    return kws.some((kw) => {
      try { return new RegExp(kw, "i").test(text); }
      catch { return false; }
    });
  });
}

export function batchTranslate(titles, callback) {
  fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts: titles, to: "pt" }),
  })
    .then((r) => r.json())
    .then((d) => callback(d.translated || []))
    .catch(() => {});
}
