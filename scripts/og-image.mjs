/**
 * Rasteriza los SVG del sitio a PNG:
 *   assets/og-image.svg  -> public/og-image.png        (1200x630)
 *   public/favicon.svg   -> public/apple-touch-icon.png (180x180)
 *
 * Las redes sociales (Facebook, LinkedIn, WhatsApp, X) e iOS ignoran los SVG,
 * asi que la vista previa al compartir y el icono de pantalla de inicio
 * necesitan si o si un mapa de bits. En lugar de sumar una dependencia binaria
 * como sharp, se usa el Chrome o Edge que ya esta instalado para capturarlos.
 *
 * Solo hay que volver a ejecutarlo (npm run og) cuando cambie el diseno.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const TARGETS = [
  { source: "assets/og-image.svg", output: "public/og-image.png", width: 1200, height: 630 },
  {
    source: "public/favicon.svg",
    output: "public/apple-touch-icon.png",
    width: 180,
    height: 180,
  },
];

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const browser = CANDIDATES.find((path) => existsSync(path));

if (!browser) {
  console.error(
    "og: no se encontro Chrome ni Edge. Define CHROME_PATH o exporta el SVG a mano."
  );
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), "og-shot-"));

/**
 * Capturar el .svg directamente hace que el tamano final dependa de los
 * atributos width/height del propio archivo: con ellos la imagen sale pequena
 * en una esquina, y sin ellos se desborda. Envolverlo en un HTML que fija las
 * dimensiones deja el resultado exacto sea cual sea el SVG de entrada.
 */
const wrapperFor = (svgUrl, width, height) =>
  `<!doctype html><meta charset="utf-8">
<style>
  html,body { margin:0; padding:0; background:transparent; }
  img { display:block; width:${width}px; height:${height}px; }
</style>
<img src="${svgUrl}" alt="">`;

try {
  for (const { source, output, width, height } of TARGETS) {
    const from = resolve(process.cwd(), source);
    const to = resolve(process.cwd(), output);

    const wrapper = join(profile, `wrapper-${width}x${height}.html`);
    writeFileSync(wrapper, wrapperFor(pathToFileURL(from).href, width, height), "utf8");

    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-sandbox",
        "--force-device-scale-factor=1",
        `--user-data-dir=${profile}`,
        `--window-size=${width},${height}`,
        `--screenshot=${to}`,
        pathToFileURL(wrapper).href,
      ],
      { stdio: "ignore" }
    );

    if (!existsSync(to)) {
      console.error(`og: la captura de ${source} no genero ningun archivo`);
      process.exit(1);
    }

    console.log(`og: ${output} generado (${width}x${height})`);
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}
