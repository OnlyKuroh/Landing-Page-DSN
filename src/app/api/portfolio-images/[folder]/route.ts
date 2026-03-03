import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ folder: string }> }
) {
  try {
    const { folder } = await context.params;
    const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, "");
    const dir = path.join(process.cwd(), "public", "images", "portfolio", safeFolder);

    const entries = await fs.readdir(dir, { withFileTypes: true });

    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => `/images/portfolio/${safeFolder}/${encodeURIComponent(fileName)}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
