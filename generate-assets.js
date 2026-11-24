import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateAssets() {
  const publicDir = path.join(__dirname, "public");
  const faviconSvgPath = path.join(publicDir, "favicon.svg");
  const ogSvgPath = path.join(publicDir, "og-image.svg");

  console.log("Generating favicon-32x32.png...");
  const favBuffer = fs.readFileSync(faviconSvgPath);
  await sharp(favBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));

  console.log("Generating apple-touch-icon.png (180x180)...");
  await sharp(favBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  console.log("Generating og-image.png (1200x630)...");
  const ogBuffer = fs.readFileSync(ogSvgPath);
  await sharp(ogBuffer)
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(publicDir, "og-image.png"));

  console.log("Assets generated successfully!");
}

generateAssets().catch((err) => {
  console.error("Error generating assets:", err);
  process.exit(1);
});
