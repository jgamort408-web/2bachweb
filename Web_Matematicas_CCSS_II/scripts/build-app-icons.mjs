/**
 * Genera los PNG de la aplicación instalable a partir de assets/icons/app/logo.svg y favicon.svg con el Chrome de
 * Playwright: icon-192/512 (any y maskable: el dibujo cabe en el círculo seguro), apple-touch-icon de 180 px sin
 * transparencia y favicon-32. Uso: CHROME_PATH=… node scripts/build-app-icons.mjs
 */
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dir = new URL('../assets/icons/app/', import.meta.url);
const logo = await readFile(new URL('logo.svg', dir), 'utf8');
const favicon = await readFile(new URL('favicon.svg', dir), 'utf8');
const outputs = [['icon-192.png', logo, 192], ['icon-512.png', logo, 512], ['apple-touch-icon.png', logo, 180], ['favicon-32.png', favicon, 32]];
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
try {
  for (const [name, svg, size] of outputs) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(`<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
    await page.screenshot({ path: fileURLToPath(new URL(name, dir)), omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    await page.close();
    console.log(name, size);
  }
} finally { await browser.close(); }
