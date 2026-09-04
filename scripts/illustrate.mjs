#!/usr/bin/env node
/**
 * Generate an Insights illustration and place it in public/insights/<slug>/.
 *
 *   node scripts/illustrate.mjs --slug <slug> --name hero --prompt-file prompt.txt [options]
 *
 * Options
 *   --provider openai|recraft|gemini   default: $IMAGE_PROVIDER or "openai"
 *   --ref <file>                       style reference image (repeatable; openai and recraft)
 *   --size hero|spot                   hero → 1600×900 webp + jpg; spot → 1200×800 webp (default: by name)
 *   --candidates <n>                   generate n variants as <name>-1.., pick by hand (default 1)
 *   --dry-run                          print the request, write nothing
 *
 * Keys come from the environment only: OPENAI_API_KEY, RECRAFT_API_KEY, GEMINI_API_KEY.
 * Output: <name>.webp (and hero.jpg for the share-image composite). Never overwrites a
 * selected image unless --force. The style itself lives in the vault's images/style-guide.md;
 * this script only executes prompts.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const args = parse(process.argv.slice(2));
if (args.help || !args.slug || !args.name || !args["prompt-file"]) {
  console.log(readHelp());
  process.exit(args.help ? 0 : 1);
}
const provider = args.provider ?? process.env.IMAGE_PROVIDER ?? "openai";
const kind = args.size ?? (args.name === "hero" ? "hero" : "spot");
const dims = kind === "hero" ? { w: 1600, h: 900 } : { w: 1200, h: 800 };
const limits = kind === "hero" ? 180_000 : 120_000;
const candidates = Number(args.candidates ?? 1);
const outDir = join(process.cwd(), "public/insights", args.slug);
const prompt = (await readFile(args["prompt-file"], "utf8")).trim();
const refs = [].concat(args.ref ?? []);

if (args["dry-run"]) {
  console.log(JSON.stringify({ provider, kind, dims, candidates, refs, outDir, prompt }, null, 2));
  process.exit(0);
}
await mkdir(outDir, { recursive: true });

for (let i = 1; i <= candidates; i++) {
  const suffix = candidates > 1 ? `-${i}` : "";
  const webpPath = join(outDir, `${args.name}${suffix}.webp`);
  if (!args.force && (await exists(webpPath))) {
    console.error(`exists, skipping (use --force): ${webpPath}`);
    continue;
  }
  const png = await generate(provider, prompt, refs);
  const image = sharp(png).resize(dims.w, dims.h, { fit: "cover", position: "attention" });
  let quality = 80;
  let webp = await image.clone().webp({ quality }).toBuffer();
  while (webp.length > limits && quality > 50) {
    quality -= 8;
    webp = await image.clone().webp({ quality }).toBuffer();
  }
  await writeFile(webpPath, webp);
  console.log(`${webpPath} ${(webp.length / 1024).toFixed(0)} KB (q${quality})`);
  if (kind === "hero") {
    const jpgPath = join(outDir, `${args.name}${suffix}.jpg`);
    await writeFile(jpgPath, await image.clone().jpeg({ quality: 82, mozjpeg: true }).toBuffer());
    console.log(jpgPath);
  }
}

async function generate(provider, prompt, refs) {
  if (provider === "openai") return openai(prompt, refs);
  if (provider === "recraft") return recraft(prompt, refs);
  if (provider === "gemini") return gemini(prompt);
  throw new Error(`unknown provider ${provider}`);
}

// OpenAI Images: gpt-image-1. With references, the edits endpoint takes them as style guidance.
async function openai(prompt, refs) {
  const key = need("OPENAI_API_KEY");
  const size = "1536x1024";
  if (refs.length === 0) {
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-1", prompt, size, quality: "medium", n: 1, output_format: "png" }),
    });
    const j = await ok(r);
    return Buffer.from(j.data[0].b64_json, "base64");
  }
  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("prompt", `${prompt}\n\nMatch the line quality, palette and composition of the reference images.`);
  form.append("size", size);
  form.append("quality", "medium");
  for (const f of refs) {
    const buf = await readFile(f);
    form.append("image[]", new Blob([buf], { type: mime(f) }), f.split("/").pop());
  }
  const r = await fetch("https://api.openai.com/v1/images/edits", { method: "POST", headers: { Authorization: `Bearer ${key}` }, body: form });
  const j = await ok(r);
  return Buffer.from(j.data[0].b64_json, "base64");
}

// Recraft V3: raster or vector illustration styles; returns a URL.
async function recraft(prompt, refs) {
  const key = need("RECRAFT_API_KEY");
  const body = { prompt, style: "digital_illustration", substyle: "hand_drawn", size: "1536x1024", n: 1, response_format: "b64_json" };
  if (refs.length) body.style_id = process.env.RECRAFT_STYLE_ID; // a custom style created from the reference set
  const r = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await ok(r);
  return Buffer.from(j.data[0].b64_json, "base64");
}

// Gemini image output (gemini-2.5-flash-image); returns inline PNG data.
async function gemini(prompt) {
  const key = need("GEMINI_API_KEY");
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["IMAGE"] } }),
  });
  const j = await ok(r);
  const part = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("gemini returned no image");
  return Buffer.from(part.inlineData.data, "base64");
}

function need(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`IMAGE PENDING: ${name} is not set. Put the key in the environment; never in the repo or the vault.`);
    process.exit(2);
  }
  return v;
}
async function ok(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}: ${(await r.text()).slice(0, 400)}`);
  return r.json();
}
async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}
function mime(f) {
  return { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" }[extname(f).toLowerCase()] ?? "application/octet-stream";
}
function parse(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    if (k === "ref") out.ref = [].concat(out.ref ?? [], v);
    else out[k] = v;
  }
  return out;
}
function readHelp() {
  return `Generate an Insights illustration into public/insights/<slug>/.

  node scripts/illustrate.mjs --slug <slug> --name hero --prompt-file prompt.txt [--provider openai|recraft|gemini] [--ref img.png ...] [--size hero|spot] [--candidates n] [--dry-run] [--force]

Keys: OPENAI_API_KEY | RECRAFT_API_KEY | GEMINI_API_KEY (environment only). Output: <name>.webp (+ hero.jpg for the share image).`;
}
