export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "No URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; EMI/1.0)" },
    });
    const html = await res.text();

    // Extract article content from HTML
    const title = extractMeta(html, "og:title") || extractTag(html, "title");
    const description = extractMeta(html, "og:description") || "";
    const image = extractMeta(html, "og:image") || "";
    const body = extractBody(html);

    return Response.json({ title, description, image, body, url });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

function extractMeta(html, property) {
  const re = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, "i");
  return (html.match(re) || html.match(alt) || [])[1] || "";
}

function extractTag(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i");
  return (html.match(re) || [])[1] || "";
}

function extractBody(html) {
  // Remove scripts, styles, nav, header, footer
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "");

  // Try to find article tag content
  const articleMatch = clean.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  const content = articleMatch ? articleMatch[1] : clean;

  // Extract paragraphs
  const paragraphs = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRegex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, "").trim();
    if (text.length > 40) paragraphs.push(text);
  }

  return paragraphs.slice(0, 30).join("\n\n");
}
