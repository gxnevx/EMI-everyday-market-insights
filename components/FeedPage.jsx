"use client";
import { useState, useEffect } from "react";
import Card from "./Card";
import { LABELS } from "@/lib/constants";

export default function FeedPage({ endpoint, section }) {
  const [articles, setArticles] = useState([]);
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [endpoint]);

  const t = LABELS[lang];
  const other = section === "news" ? "insights" : "news";

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-cream">
      <nav className="flex items-center justify-between px-5 py-4 border-b border-divider">
        <div className="flex gap-6">
          <a href="/news" className={`font-serif text-lg ${section === "news" ? "font-bold text-ink" : "text-muted"}`}>
            {t.news}
          </a>
          <a href="/insights" className={`font-serif text-lg ${section === "insights" ? "font-bold text-ink" : "text-muted"}`}>
            {t.insights}
          </a>
        </div>
        <button onClick={() => setLang((l) => (l === "en" ? "pt" : "en"))} className="text-sm text-muted font-sans">
          {lang === "en" ? "PT" : "EN"}
        </button>
      </nav>

      <main className="px-5">
        <h1 className="font-serif font-bold text-2xl mt-6 mb-1">{t.today}</h1>
        <p className="text-sm text-muted font-sans mb-4">{t[section]}</p>

        {loading && <p className="text-sm text-muted py-8 text-center font-sans">Loading...</p>}
        {!loading && articles.length === 0 && (
          <p className="text-sm text-muted py-8 text-center font-sans">{t.noArticles}</p>
        )}

        {articles.map((a, i) => <Card key={i} article={a} lang={lang} />)}
      </main>
    </div>
  );
}
