export function formatDate(dateStr, lang = "en") {
  const d = new Date(dateStr);
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function todayISO() {
  return new Date().toISOString().split("T")[0];
}
