"use client";
import { CATEGORIES } from "@/lib/keywords";

const CAT_NAMES = Object.keys(CATEGORIES);

export default function FilterPanel({ active, onToggle, lang, onClose }) {
  return (
    <div className="px-5 py-4 border-b border-divider bg-cream">
      <div className="flex justify-between items-center mb-3">
        <p className="font-sans text-xs text-muted uppercase tracking-wide">
          {lang === "pt" ? "Filtrar por" : "Filter by"}
        </p>
        <button onClick={onClose} className="text-xs text-muted font-sans">✕</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {CAT_NAMES.map((cat) => {
          const isOn = active.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggle(cat)}
              className={`px-3 py-1.5 text-xs font-sans border transition-colors ${
                isOn
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-muted border-divider"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
