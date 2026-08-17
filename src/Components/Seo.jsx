import { useEffect } from "react";
import { site } from "../../site.config.mjs";

/**
 * Gestiona los metadatos de la pagina sin dependencias externas.
 *
 * El build ya deja los metadatos correctos escritos en el HTML de cada ruta
 * (ver scripts/prerender.mjs), asi que los rastreadores los leen sin ejecutar
 * JavaScript. Este componente se encarga de mantenerlos sincronizados cuando
 * el usuario navega dentro de la SPA, reescribiendo las mismas etiquetas en
 * lugar de duplicarlas.
 */

const absoluteUrl = (value) => {
  if (!value) return undefined;
  return /^https?:\/\//.test(value) ? value : `${site.url}${value}`;
};

/** Crea la etiqueta si no existe y devuelve la referencia para actualizarla. */
const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr, key, content) => {
  const selector = `meta[${attr}="${key}"]`;
  if (content == null || content === "") {
    document.head.querySelector(selector)?.remove();
    return;
  }
  const el = upsert(selector, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    return meta;
  });
  el.setAttribute("content", content);
};

const Seo = ({
  title,
  description,
  path,
  image = site.ogImage,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}) => {
  useEffect(() => {
    const canonical = absoluteUrl(path || window.location.pathname);
    const imageUrl = absoluteUrl(image);

    if (title) document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "keywords", Array.isArray(keywords) ? keywords.join(", ") : keywords);
    setMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:alt", site.ogImageAlt);
    setMeta("property", "og:site_name", site.name);
    setMeta("property", "og:locale", site.locale);

    // Twitter / X
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    // Canonical
    const link = upsert('link[rel="canonical"]', () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    });
    link.setAttribute("href", canonical);
  }, [title, description, path, image, type, keywords, noindex]);

  // El JSON-LD de la ruta se monta aparte: es el unico bloque que debe
  // desaparecer al desmontar la pagina, para no mezclar structured data.
  useEffect(() => {
    if (!jsonLd) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "route";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => script.remove();
  }, [jsonLd]);

  return null;
};

export default Seo;
