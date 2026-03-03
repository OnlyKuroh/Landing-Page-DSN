import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "images", "about");
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .map((fileName) => `/images/about/${encodeURIComponent(fileName)}`)
      .sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
