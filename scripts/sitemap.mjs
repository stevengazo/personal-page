/**
 * Genera dist/sitemap.xml y dist/robots.txt.
 *
 * Las rutas estaticas salen de site.config.mjs. Las fichas de proyecto viven en
 * Contentful, asi que se consultan por la API de entrega para que cada proyecto
 * publicado tenga su URL en el sitemap con su fecha real de actualizacion.
 *
 * Si Contentful no responde o faltan credenciales, el sitemap se genera igual
 * con las rutas estaticas: un sitemap incompleto es preferible a un build roto.
 */
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnv } from "./lib/env.mjs";

loadEnv();

const { site, routes, credentials } = await import("../site.config.mjs");

const DIST = resolve(process.cwd(), "dist");
const SPACE = credentials.contentfulSpaceId;
const TOKEN = credentials.contentfulAccessToken;

async function fetchProjects() {
  if (!SPACE || !TOKEN) {
    console.warn("sitemap: sin credenciales de Contentful, se omiten los proyectos");
    return [];
  }

  const url =
    `https://cdn.contentful.com/spaces/${SPACE}/environments/master/entries` +
    `?content_type=projects&select=sys.id,sys.updatedAt&limit=1000&access_token=${TOKEN}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`sitemap: Contentful respondio ${response.status}, se omiten los proyectos`);
      return [];
    }

    const { items = [] } = await response.json();
    return items.map((item) => ({
      loc: `${site.url}/projectview/${item.sys.id}`,
      lastmod: item.sys.updatedAt?.slice(0, 10),
      changefreq: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.warn(`sitemap: fallo la consulta a Contentful (${error.message})`);
    return [];
  }
}

const today = new Date().toISOString().slice(0, 10);

const staticEntries = routes
  .filter((route) => route.sitemap)
  .map((route) => ({
    loc: route.path === "/" ? `${site.url}/` : `${site.url}${route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

const entries = [...staticEntries, ...(await fetchProjects())];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(({ loc, lastmod, changefreq, priority }) =>
    [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
      priority != null ? `    <priority>${priority.toFixed(1)}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n")
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(DIST, "sitemap.xml"), xml, "utf8");

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Rutas sin valor para buscadores",
  "Disallow: /404.html",
  "",
  `Sitemap: ${site.url}/sitemap.xml`,
  "",
].join("\n");

writeFileSync(join(DIST, "robots.txt"), robots, "utf8");

console.log(`sitemap: ${entries.length} URLs -> dist/sitemap.xml, dist/robots.txt`);
