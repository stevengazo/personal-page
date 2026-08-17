/**
 * Fuente unica de verdad del sitio.
 *
 * Lo consumen dos entornos distintos: la aplicacion React en el navegador
 * (componente <Seo />) y los scripts de build en Node (prerender del HTML por
 * ruta y generacion del sitemap). Cada uno expone las variables de entorno por
 * una via propia, y la del otro no existe:
 *
 *   - En el navegador solo hay `import.meta.env`; leer `process` lanza
 *     ReferenceError porque Vite no lo define.
 *   - En Node solo hay `process.env`; `import.meta.env` es `undefined`.
 *
 * De ahi que se consulten las dos con guardas, en lugar de asumir una.
 */

const readEnv = (key) => {
  const viteEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
  if (viteEnv?.[key]) return viteEnv[key];

  if (typeof process !== "undefined" && process.env?.[key]) return process.env[key];

  return undefined;
};

export const SITE_URL = (
  readEnv("VITE_SITE_URL") || "https://stevengazo.co.cr"
).replace(/\/$/, "");

/**
 * TEMPORAL — credenciales embebidas.
 *
 * Los valores por defecto estan escritos aqui a proposito para que el sitio
 * compile y funcione sin ningun .env, igual que antes. Si la variable de
 * entorno existe (por ejemplo declarada en el panel del hosting), esa gana.
 *
 * Al ser variables `VITE_*` acaban en el bundle del navegador de cualquier
 * forma: son publicas por definicion, no secretos. Aun asi el token de
 * Contentful esta versionado, asi que conviene rotarlo y pasar a variables de
 * entorno en cuanto se pueda (ver el roadmap del README). Nunca poner aqui un
 * token de escritura ni el Content Management token.
 */
export const credentials = {
  contentfulSpaceId: readEnv("VITE_CONTENTFUL_SPACE_ID") || "rrrdxlcb7vsn",
  contentfulAccessToken:
    readEnv("VITE_CONTENTFUL_ACCESS_TOKEN") ||
    "CjYYXwIkNP44oA80IM4CEbmt1z2hwuiuZh2P2n-J5EE",
  formspreeId: readEnv("VITE_FORMSPREE_ID") || "mwpvbzzp",
  clarityProjectId: readEnv("VITE_CLARITY_PROJECT_ID") || "vzid9t6gtm",
};

export const site = {
  url: SITE_URL,
  name: "Steven Gazo",
  fullName: "Steven Gazo M",
  jobTitle: "Full Stack Developer",
  /** Idioma principal del contenido. Afecta <html lang> y og:locale. */
  lang: "es",
  locale: "es_CR",
  twitterHandle: "",
  ogImage: "/og-image.png",
  ogImageAlt: "Steven Gazo — Full Stack Developer (React y .NET)",
  themeColor: "#0f172a",
  /**
   * Subdominios propios enlazados desde la navegacion y el pie.
   *
   * Son sitios aparte: se navegan con un <a> normal en vez del router y no
   * entran en el sitemap de este dominio, porque cada uno publica el suyo.
   */
  subdomains: [
    { label: "Savegre", url: "https://savegre.stevengazo.co.cr" },
    { label: "Wapi", url: "https://wapi.stevengazo.co.cr" },
  ],
  social: {
    github: "https://github.com/stevengazo",
    linkedin: "https://www.linkedin.com/in/stevengazo/",
    email: "steven.gazo@hotmail.com",
    whatsapp: "https://wa.me/50686279806",
  },
  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    ".NET",
    "C#",
    "SQL Server",
    "Node.js",
    "Desarrollo Web",
  ],
};

/**
 * Rutas estaticas del sitio. `prerender` genera un HTML propio por ruta con sus
 * metadatos ya resueltos, y `sitemap` decide si entra al sitemap.xml.
 */
export const routes = [
  {
    path: "/",
    title: "Steven Gazo | Desarrollador Full Stack React y .NET",
    description:
      "Portafolio de Steven Gazo, desarrollador full stack en Costa Rica especializado en React, .NET y C#. Proyectos, formación y contacto.",
    changefreq: "monthly",
    priority: 1.0,
    sitemap: true,
  },
  {
    path: "/projects",
    title: "Proyectos | Steven Gazo",
    description:
      "Proyectos de desarrollo web y software de Steven Gazo: aplicaciones en React, APIs en .NET, automatizaciones y herramientas internas.",
    changefreq: "weekly",
    priority: 0.9,
    sitemap: true,
  },
  {
    path: "/education",
    title: "Formación y cursos | Steven Gazo",
    description:
      "Formación académica y cursos de especialización de Steven Gazo en ingeniería en computación, desarrollo web y tecnologías .NET.",
    changefreq: "monthly",
    priority: 0.7,
    sitemap: true,
  },
  {
    path: "/contacts",
    title: "Contacto | Steven Gazo",
    description:
      "Contactá a Steven Gazo para proyectos de desarrollo web, aplicaciones a medida o consultoría técnica. Correo, LinkedIn, GitHub y WhatsApp.",
    changefreq: "yearly",
    priority: 0.6,
    sitemap: true,
  },
];

export default site;
