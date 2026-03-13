import { formatDate } from "@/lib/dates";

export default function Card({ article, lang = "en", onOpen, translatedTitle }) {
  const { title, description, source, author, publishedAt, urlToImage } = article;

  return (
    <div onClick={onOpen} className="py-5 border-b border-divider cursor-pointer">
      {urlToImage && (
        <img src={urlToImage} alt="" className="w-full h-44 object-cover mb-3" />
      )}
      <p className="text-xs font-sans text-muted uppercase tracking-wide mb-1">
        {source} {author ? `· ${author}` : ""}
      </p>
      <h2 className="font-serif font-bold text-lg leading-snug mb-1">
        {translatedTitle || title}
      </h2>
      {description && (
        <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
      <p className="text-xs text-muted mt-2 font-sans">
        {formatDate(publishedAt, lang)}
      </p>
    </div>
  );
}
