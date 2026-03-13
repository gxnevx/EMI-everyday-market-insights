"use client";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/dates";

export default function ArticleView({ article, lang, onBack }) {
  const [body, setBody] = useState("");
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(true);

  const { title, description, source, author, publishedAt, urlToImage, url } = article;

  // Fetch full article body
  useEffect(() => {
    fetch(`/api/fetch-article?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => {
        setBody(d.body || description || "");
        if (d.image && !urlToImage) article.urlToImage = d.image;
      })
      .catch(() => setBody(description || ""))
      .finally(() => setLoading(false));
  }, [url]);

  // Translate when lang changes to PT
  useEffect(() => {
    if (lang !== "pt" || !body) { setTranslated(null); return; }
    const toTranslate = `${title}\n---\n${body}`;
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: toTranslate, to: "pt" }),
    })
      .then((r) => r.json())
      .then((d) => setTranslated(d.translated || null))
      .catch(() => setTranslated(null));
  }, [lang, body]);

  const displayTitle = lang === "pt" && translated
    ? translated.split("\n---\n")[0] : title;
  const displayBody = lang === "pt" && translated
    ? translated.split("\n---\n").slice(1).join("\n\n") : body;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-cream">
      <div className="px-5 py-4 border-b border-divider">
        <button onClick={onBack} className="text-sm font-sans text-muted">
          ← {lang === "pt" ? "Voltar" : "Back"}
        </button>
      </div>

      <article className="px-5 pb-12">
        {(urlToImage || article.urlToImage) && (
          <img src={urlToImage || article.urlToImage} alt="" className="w-full h-52 object-cover mt-4" />
        )}

        <p className="text-xs font-sans text-muted uppercase tracking-wide mt-4 mb-2">
          {source} {author ? `· ${author}` : ""} · {formatDate(publishedAt, lang)}
        </p>

        <h1 className="font-serif font-bold text-2xl leading-snug mb-4">
          {displayTitle}
        </h1>

        {loading && (
          <p className="text-sm text-muted font-sans py-4">
            {lang === "pt" ? "Carregando..." : "Loading..."}
          </p>
        )}

        {!loading && displayBody.split("\n\n").map((p, i) => (
          <p key={i} className="font-serif text-base leading-relaxed text-ink mb-4">
            {p}
          </p>
        ))}

        {lang === "pt" && !translated && !loading && (
          <p className="text-xs text-muted font-sans italic">
            Traduzindo...
          </p>
        )}

        <div className="flex gap-3 mt-8 pt-6 border-t border-divider">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 bg-ink text-cream font-sans text-sm"
          >
            {lang === "pt" ? "Compartilhar no LinkedIn" : "Share on LinkedIn"}
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 border border-ink text-ink font-sans text-sm"
          >
            {lang === "pt" ? "Ver original" : "View original"}
          </a>
        </div>
      </article>
    </div>
  );
}
