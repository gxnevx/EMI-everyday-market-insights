import { translate } from "@/lib/translate";

export async function POST(request) {
  try {
    const { text, to = "pt" } = await request.json();
    const translated = await translate(text, to);
    return Response.json({ translated });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
