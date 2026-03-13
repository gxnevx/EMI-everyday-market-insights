import { translate } from "@/lib/translate";

export async function POST(request) {
  try {
    const { text, texts, to = "pt" } = await request.json();

    // Batch mode: translate array of strings in one call
    if (texts && Array.isArray(texts)) {
      const joined = texts.join("\n||||\n");
      const result = await translate(joined, to);
      const translated = result.split("\n||||\n").map((s) => s.trim());
      return Response.json({ translated });
    }

    // Single mode
    const translated = await translate(text || "", to);
    return Response.json({ translated });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
