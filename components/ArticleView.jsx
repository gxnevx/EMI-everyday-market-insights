"use client";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/dates";

export default function ArticleView({ article, lang, onBack }) {
  const [body, setBody] = useState("");
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { title, description, source, author, publishedAt, urlToImage, url, score } = article;

  const scoreLabel = score >= 8 ? (lang === "pt" ? "Alto" : "High") : score >= 5 ? (lang === "pt" ? "Médio" : "Medium") : (lang === "pt" ? "Baixo" : "Low");
  const scoreColor = score >= 8 ? "text-red-700" : score >= 5 ? "text-yellow-700" : "text-muted";
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    fetch(`/api/fetch-article?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => setBody(d.body || description || ""))
      .catch(() => setBody(description || ""))
      .finally(() => setLoading(false));
  }, [url]);

  useEffect(() => {
    if (lang !== "pt" || !body) { setTranslated(null); return; }
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `${title}\n---\n${body}`, to: "pt" }),
    })
      .then((r) => r.json())
      .then((d) => setTranslated(d.translated || null))
      .catch(() => setTranslated(null));
  }, [lang, body]);

  const parts = translated ? translated.split("\n---\n") : [];
  const dTitle = lang === "pt" && parts[0] ? parts[0] : title;
  const dBody = lang === "pt" && parts[1] ? parts.slice(1).join("\n\n") : body;

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-cream">
      <div className="px-5 py-4 border-b border-divider">
        <button onClick={onBack} className="text-sm font-sans text-muted">
          ← {lang === "pt" ? "Voltar" : "Back"}
        </button>
      </div>
      <article className="px-5 pb-12">
        {urlToImage && <img src={urlToImage} alt="" className="w-full h-52 object-cover mt-4" />}
        <p className="text-xs font-sans text-muted uppercase tracking-wide mt-4 mb-1">
          {source} {author ? `· ${author}` : ""} · {formatDate(publishedAt, lang)}
        </p>
        {score && (
          <p className={`text-xs font-sans font-medium uppercase tracking-wide mb-3 ${scoreColor}`}>
            {lang === "pt" ? "Impacto" : "Impact"}: {scoreLabel} ({score}/10)
          </p>
        )}
        <h1 className="font-serif font-bold text-2xl leading-snug mb-4">{dTitle}</h1>
        {loading && <p className="text-sm text-muted font-sans py-4">{lang === "pt" ? "Carregando..." : "Loading..."}</p>}
        {!loading && dBody.split("\n\n").map((p, i) => (
          <p key={i} className="font-serif text-base leading-relaxed text-ink mb-4">{p}</p>
        ))}
        {lang === "pt" && !translated && !loading && (
          <p className="text-xs text-muted font-sans italic">Traduzindo...</p>
        )}
        <div className="flex gap-3 mt-8 pt-6 border-t border-divider">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-3 bg-ink text-cream font-sans text-sm">
            {lang === "pt" ? "Compartilhar no LinkedIn" : "Share on LinkedIn"}
          </a>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-3 border border-ink text-ink font-sans text-sm">
            {lang === "pt" ? "Ver original" : "View original"}
          </a>
        </div>
      </article>
    </div>
  );
}
