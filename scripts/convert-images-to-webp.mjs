import path from "node:path";
import { promises as fs } from "node:fs";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "public", "images");
const BACKUP_DIR = path.join(ROOT, "backup", "original-images");

const CONVERTIBLE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const SKIP_DIRECTORIES = new Set([".git", ".next", "node_modules", "backup"]);

async function ensureDir(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function walkFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRECTORIES.has(entry.name)) continue;
      files.push(...(await walkFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;
    files.push(fullPath);
  }

  return files;
}

function getRelativeToImages(filePath) {
  return path.relative(SOURCE_DIR, filePath);
}

async function backupOriginal(sourceFilePath) {
  const relative = getRelativeToImages(sourceFilePath);
  const backupPath = path.join(BACKUP_DIR, relative);

  await ensureDir(path.dirname(backupPath));
  await fs.copyFile(sourceFilePath, backupPath);

  return backupPath;
}

async function convertFileToWebp(sourceFilePath) {
  const relative = getRelativeToImages(sourceFilePath);
  const parsed = path.parse(sourceFilePath);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

  await sharp(sourceFilePath)
    .webp({
      quality: 100,
      effort: 6,
      lossless: true,
      nearLossless: false,
    })
    .toFile(webpPath);

  await fs.unlink(sourceFilePath);

  return {
    relative,
    webpRelative: path.relative(SOURCE_DIR, webpPath),
  };
}

async function run() {
  try {
    await ensureDir(BACKUP_DIR);

    const allFiles = await walkFiles(SOURCE_DIR);
    const sourceFiles = allFiles.filter((filePath) =>
      CONVERTIBLE_EXTENSIONS.has(path.extname(filePath).toLowerCase())
    );

    if (sourceFiles.length === 0) {
      console.log("Nenhuma imagem PNG/JPG/JPEG encontrada em public/images.");
      return;
    }

    const summary = [];
    const failed = [];

    for (const sourceFilePath of sourceFiles) {
      try {
        await backupOriginal(sourceFilePath);
        const converted = await convertFileToWebp(sourceFilePath);
        summary.push(converted);
        console.log(`Convertido: ${converted.relative} -> ${converted.webpRelative}`);
      } catch (error) {
        const relative = getRelativeToImages(sourceFilePath);
        failed.push({ relative, error });
        console.error(`Falha em: ${relative}`);
      }
    }

    console.log("");
    console.log(`Total convertido: ${summary.length}`);
    console.log(`Total com falha: ${failed.length}`);
    console.log(`Backup em: ${path.relative(ROOT, BACKUP_DIR)}`);

    if (failed.length > 0) {
      console.log("Arquivos com falha:");
      for (const item of failed) {
        const reason = item.error instanceof Error ? item.error.message : String(item.error);
        console.log(`- ${item.relative}: ${reason}`);
      }
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("Falha ao converter imagens para WebP:", error);
    process.exitCode = 1;
  }
}

run();
