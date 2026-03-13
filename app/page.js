"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Card from "@/components/Card";
import ArticleView from "@/components/ArticleView";
import FilterPanel from "@/components/FilterPanel";
import { LABELS } from "@/lib/constants";
import { CATEGORIES } from "@/lib/keywords";
import { useSwipe } from "@/lib/useSwipe";
import { applyFilter, batchTranslate } from "@/lib/helpers";
import { useRefreshCounter } from "@/lib/useRefreshCounter";

const TABS = ["news", "insights"];
const ENDPOINTS = { news: "/api/fetch-news", insights: "/api/fetch-insights" };
const ALL_CATS = Object.keys(CATEGORIES);

export default function Home() {
  const [tab, setTab] = useState(0), [lang, setLang] = useState("en");
  const [data, setData] = useState({ news: [], insights: [] }), [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null), [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(ALL_CATS), [trMap, setTrMap] = useState({});
  const savedTab = useRef(0);
  const { count: refreshes, increment: incRefresh } = useRefreshCounter();
  const [section, t] = [TABS[tab], LABELS[lang]];

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [news, insights] = await Promise.all([
      fetch(ENDPOINTS.news).then((r) => r.json()).catch(() => ({ articles: [] })),
      fetch(ENDPOINTS.insights).then((r) => r.json()).catch(() => ({ articles: [] })),
    ]);
    setData({ news: news.articles || [], insights: insights.articles || [] });
    incRefresh();
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (lang !== "pt") return;
    const all = [...data.news, ...data.insights].filter((a) => !trMap[a.title]);
    if (!all.length) return;
    batchTranslate(all.map((a) => a.title), (results) => {
      const m = { ...trMap };
      all.forEach((a, i) => { m[a.title] = results[i]; });
      setTrMap(m);
    });
  }, [lang, data]);

  const goBack = () => { setSelected(null); setTab(savedTab.current); window.scrollTo(0, 0); };
  const tabSwipe = useSwipe(() => !selected && setTab((t) => Math.min(t + 1, 1)), () => !selected && setTab((t) => Math.max(t - 1, 0)));
  const articleSwipe = useSwipe(() => {}, goBack);
  const filtered = section === "news" ? applyFilter(data.news, filters) : data.insights;
  const animClass = tabSwipe.swipeDir === "left" ? "slide-left" : tabSwipe.swipeDir === "right" ? "slide-right" : "slide-enter";

  if (selected) return <div {...articleSwipe} className="slide-enter"><ArticleView article={selected} lang={lang} onBack={goBack} /></div>;

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-cream" {...tabSwipe}>
      <nav className="flex items-center justify-between px-5 py-4 border-b border-divider">
        <div className="flex gap-6">
          {TABS.map((s, i) => (
            <button key={s} onClick={() => setTab(i)}
              className={`font-serif text-lg transition-colors ${tab === i ? "font-bold text-ink" : "text-muted"}`}>{t[s]}</button>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => setShowFilter((f) => !f)} className="font-sans text-xs font-medium text-ink tracking-wide uppercase">
            {showFilter ? "Close" : "Filter"}
          </button>
          <button onClick={() => setLang((l) => l === "en" ? "pt" : "en")} className="font-sans text-xs font-medium text-ink tracking-wide uppercase">
            {lang === "en" ? "PT" : "EN"}
          </button>
        </div>
      </nav>
      {showFilter && <FilterPanel active={filters} onToggle={(c) => setFilters((f) => f.includes(c) ? f.filter((x) => x !== c) : [...f, c])} lang={lang} onClose={() => setShowFilter(false)} />}
      <main className={`px-5 ${animClass}`} key={section}>
        <h1 className="font-serif font-bold text-2xl mt-6 mb-1">{t.today}</h1>
        <p className="text-sm text-muted font-sans mb-4">{t[section]}</p>
        {loading && <p className="text-sm text-muted py-8 text-center font-sans">Loading...</p>}
        {!loading && !filtered.length && <p className="text-sm text-muted py-8 text-center font-sans">{t.noArticles}</p>}
        {filtered.map((a, i) => (
          <Card key={`${section}-${i}`} article={a} lang={lang} translatedTitle={lang === "pt" ? trMap[a.title] : null}
            onOpen={() => { savedTab.current = tab; setSelected(a); window.scrollTo(0, 0); }} />
        ))}
      </main>
      <p className="text-center text-xs text-muted font-sans py-3 border-t border-divider">{refreshes}/100 {lang === "pt" ? "atualizações hoje" : "refreshes today"}</p>
    </div>
  );
}
