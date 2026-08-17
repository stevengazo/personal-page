import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Carga un .env en process.env para los scripts de build.
 *
 * Vite solo expone las variables al bundle del navegador, no al proceso de
 * Node, y estos scripts corren fuera de Vite. Las variables que ya existan en
 * el entorno (por ejemplo las del panel de Netlify o Vercel) tienen prioridad.
 */
export function loadEnv(file = ".env") {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) return;

  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    const value = line
      .slice(eq + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");

    if (!(key in process.env)) process.env[key] = value;
  }
}
