#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import { pathToFileURL } from "url";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";

const usage = `Usage: node export.mjs <presentation-dir> [--pdf] [--ppt]

Examples:
  node export.mjs eslibre-2026          # generates PDF + PPTX
  node export.mjs side-projects --pdf   # PDF only
  node export.mjs eslibre-2026 --ppt    # PPTX only`;

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const positional = args.filter((a) => !a.startsWith("--"));

if (positional.length === 0) {
  console.error(usage);
  process.exit(1);
}

const dir = positional[0];
const pdfOnly = flags.includes("--pdf");
const pptOnly = flags.includes("--ppt");
const exportPdf = !pptOnly || pdfOnly;
const exportPpt = !pdfOnly || pptOnly;

const htmlPath = resolve(dir, "index.html");
if (!existsSync(htmlPath)) {
  console.error(`Error: ${htmlPath} not found`);
  process.exit(1);
}

const WIDTH = 1920;
const HEIGHT = 1080;
const TRANSITION_WAIT = 600; // CSS transition is 500ms

async function captureSlides() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  const fileUrl = pathToFileURL(htmlPath).href;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  const slideCount = await page.evaluate(() =>
    document.querySelectorAll(".slide").length
  );
  console.log(`Found ${slideCount} slides`);

  const screenshots = [];

  for (let i = 0; i < slideCount; i++) {
    await page.evaluate((idx) => showSlide(idx), i);
    await new Promise((r) => setTimeout(r, TRANSITION_WAIT));
    const buffer = await page.screenshot({ type: "png" });
    screenshots.push(buffer);
    process.stdout.write(`  Captured slide ${i + 1}/${slideCount}\r`);
  }
  console.log();

  await browser.close();
  return screenshots;
}

async function buildPdf(screenshots, outPath) {
  const pdf = await PDFDocument.create();

  for (const png of screenshots) {
    const image = await pdf.embedPng(png);
    const page = pdf.addPage([WIDTH, HEIGHT]);
    page.drawImage(image, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
  }

  const bytes = await pdf.save();
  const { writeFileSync } = await import("fs");
  writeFileSync(outPath, bytes);
  console.log(`PDF saved: ${outPath}`);
}

async function buildPpt(screenshots, outPath) {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 }); // 16:9 inches
  pptx.layout = "WIDE";

  for (const png of screenshots) {
    const slide = pptx.addSlide();
    const base64 = `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
    slide.addImage({ data: base64, x: 0, y: 0, w: "100%", h: "100%" });
  }

  await pptx.writeFile({ fileName: outPath });
  console.log(`PPTX saved: ${outPath}`);
}

async function main() {
  console.log(`Exporting "${dir}" ...`);
  const screenshots = await captureSlides();

  if (exportPdf) {
    await buildPdf(screenshots, join(dir, "export.pdf"));
  }
  if (exportPpt) {
    await buildPpt(screenshots, join(dir, "export.pptx"));
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
