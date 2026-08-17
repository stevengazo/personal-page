/**
 * Genera un HTML estatico por cada ruta del sitio.
 *
 * La app es una SPA: sin esto, todas las rutas comparten el mismo index.html y
 * los rastreadores ven el titulo y la descripcion de la portada en /projects,
 * /education y /contacts. Aqui se clona el index.html construido por Vite y se
 * reescriben los metadatos de cada ruta, de modo que el HTML servido ya sea
 * correcto antes de que React se ejecute.
 *
 * Como efecto secundario util, el hosting estatico sirve /projects/index.html
 * directamente y los enlaces profundos dejan de depender de reglas de rewrite.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { loadEnv } from "./lib/env.mjs";

loadEnv();

const { site, routes } = await import("../site.config.mjs");

const DIST = resolve(process.cwd(), "dist");

/**
 * Precarga de las tipografias.
 *
 * Al declararse dentro del CSS, el navegador no descubre los .woff2 hasta que
 * ha descargado y analizado la hoja de estilos, y hasta entonces el texto se
 * pinta con la fuente de reserva. El preload adelanta esa peticion. Los nombres
 * llevan hash, asi que se leen del propio build en lugar de codificarlos.
 */
const fontPreloads = readdirSync(join(DIST, "assets"))
  .filter((file) => file.endsWith(".woff2"))
  .map(
    (file) =>
      `    <link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`
  )
  .join("\n");

const template = readFileSync(join(DIST, "index.html"), "utf8").replace(
  "</head>",
  `${fontPreloads}\n  </head>`
);

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Reemplaza el content de una meta concreta, o la deja igual si no existe. */
const setMeta = (html, attr, key, content) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"[^>]*content=")[^"]*(")`, "i"),
    `$1${escape(content)}$2`
  );

const canonicalFor = (path) =>
  path === "/" ? `${site.url}/` : `${site.url}${path}`;

function renderRoute({ path, title, description, noindex = false }) {
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escape(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", canonicalFor(path));
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${canonicalFor(path)}$2`
  );

  if (noindex) {
    html = setMeta(html, "name", "robots", "noindex, nofollow");
  }

  return html;
}

const written = [];

for (const route of routes) {
  // La portada ya es dist/index.html; el resto vive en su propia carpeta.
  const target =
    route.path === "/"
      ? join(DIST, "index.html")
      : join(DIST, route.path.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderRoute(route), "utf8");
  written.push(route.path);
}

// Pagina 404 del hosting: mismo bundle, pero fuera del indice de busqueda.
writeFileSync(
  join(DIST, "404.html"),
  renderRoute({
    path: "/404",
    title: "Página no encontrada | Steven Gazo",
    description: "La página que buscás no existe o fue movida.",
    noindex: true,
  }),
  "utf8"
);

console.log(`prerender: ${written.length + 1} paginas -> ${written.join(", ")}, /404`);
