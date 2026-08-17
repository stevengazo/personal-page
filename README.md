# Steven Gazo — Sitio personal

Portafolio personal en [stevengazo.co.cr](https://stevengazo.co.cr). Reúne mis
proyectos, formación y vías de contacto. El contenido se administra desde
Contentful, así que publicar un proyecto nuevo no requiere tocar código.

## Stack

| Capa | Herramienta |
| --- | --- |
| UI | React 18 + React Router 7 |
| Build | Vite 5 |
| Estilos | Tailwind CSS 3 |
| Animación | Motion (`motion/react`) |
| Tipografía | Inter + Space Grotesk, auto-hospedadas |
| Contenido | Contentful (Content Delivery API) |
| Formulario | Formspree |
| Analítica | Microsoft Clarity |

## Puesta en marcha

```bash
git clone https://github.com/stevengazo/personal-page.git
cd personal-page
npm install
cp .env.example .env   # y completar los valores
npm run dev
```

### Configuración y credenciales

El proyecto **arranca sin ningún `.env`**: los valores están escritos como
valores por defecto en el bloque `credentials` de `site.config.mjs`. Si la
variable de entorno correspondiente existe, esa gana.

| Variable | Para qué sirve |
| --- | --- |
| `VITE_CONTENTFUL_SPACE_ID` | Space de Contentful |
| `VITE_CONTENTFUL_ACCESS_TOKEN` | Token de lectura (CDA) |
| `VITE_FORMSPREE_ID` | Formulario de contacto |
| `VITE_CLARITY_PROJECT_ID` | Analítica |
| `VITE_SITE_URL` | URL pública para canonicals y sitemap |

> **Temporal.** Vite inyecta las variables `VITE_*` en el bundle del navegador,
> así que ninguna de ellas es un secreto: quien abra el sitio puede leerlas.
> El token de Contentful es de solo lectura sobre contenido ya publicado, que
> es el mínimo necesario para un sitio estático. Aun así está versionado, así
> que conviene rotarlo y moverlo a variables de entorno del hosting cuando se
> pueda (está en el roadmap). **Nunca pongas ahí un token de escritura ni el
> Content Management token.**

Para pasar a variables de entorno: copiá `.env.example` a `.env`, completá los
valores y declaralos también en el panel de tu hosting.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción + paso de SEO |
| `npm run seo` | Prerender de rutas + `sitemap.xml` + `robots.txt` |
| `npm run og` | Regenera `og-image.png` y `apple-touch-icon.png` |
| `npm run preview` | Sirve el build ya generado |
| `npm run lint` | ESLint |

## Estructura

```
site.config.mjs          Fuente única: URL, datos personales, rutas y sus metadatos
scripts/
  prerender.mjs          Genera un HTML por ruta con sus metadatos resueltos
  sitemap.mjs            sitemap.xml + robots.txt (consulta Contentful)
  og-image.mjs           Rasteriza los SVG a PNG con el Chrome/Edge instalado
assets/og-image.svg      Fuente editable de la imagen para compartir
src/
  Components/Seo.jsx     Metadatos por ruta durante la navegación cliente
  Pages/                 Una página por ruta
  Module/MainLayout.jsx  Navbar, fondo, contenedor y pie comunes
  Module/Home/           Secciones de la portada (hero, servicios, stack…)
  client/contentful.js   Cliente de Contentful
```

Los subdominios enlazados desde la navegación y el pie (`savegre`, `wapi`) se
declaran en `site.config.mjs`. Son sitios aparte: se navegan con un `<a>` normal
en vez del router y no entran en este sitemap, porque cada uno publica el suyo.

La portada se compone en `src/Pages/Home.jsx` a partir de las secciones de
`src/Module/Home/`. «Proyectos destacados» se carga de forma diferida porque
arrastra el cliente de Contentful, que no debe pesar en el bundle inicial; si
la consulta falla, la sección se omite en vez de mostrar un error en la primera
pantalla del sitio.

## Cómo funciona el SEO

El sitio es una SPA: sin ayuda, el HTML servido para toda ruta sería el mismo y
los buscadores verían el título de la portada en `/projects`, `/education` y
`/contacts`. El build lo resuelve en dos pasos:

1. **`scripts/prerender.mjs`** clona el `index.html` de Vite y genera
   `dist/projects/index.html`, `dist/education/index.html`, etc., cada uno con
   su `<title>`, `description`, `canonical` y Open Graph ya escritos. El
   rastreador los lee sin ejecutar JavaScript. Como efecto secundario, los
   enlaces profundos funcionan sin reglas de rewrite en el hosting.
2. **`src/Components/Seo.jsx`** mantiene esos mismos metadatos sincronizados
   cuando el visitante navega dentro de la SPA, reescribiendo las etiquetas en
   lugar de duplicarlas.

Para añadir o cambiar una ruta, edítala en `site.config.mjs`: de ahí salen el
prerender, el sitemap y los metadatos que usa la página.

El structured data (`schema.org`) se reparte entre `index.html` — `Person` y
`WebSite`, comunes a todo el sitio — y cada página, que aporta el suyo
(`CollectionPage`, `ContactPage`, `CreativeWork`…) referenciando la misma
entidad `#person`.

### Después de desplegar

- [ ] Verificar el dominio en [Google Search Console](https://search.google.com/search-console)
      y enviar `https://stevengazo.co.cr/sitemap.xml`.
- [ ] Repetir en [Bing Webmaster Tools](https://www.bing.com/webmasters).
- [ ] Revisar la vista previa al compartir en el
      [validador de LinkedIn](https://www.linkedin.com/post-inspector/) y el
      [de Facebook](https://developers.facebook.com/tools/debug/).

## Despliegue

El build produce un sitio estático en `dist/`, servible desde cualquier hosting
estático. `public/_redirects` cubre Netlify: las rutas dinámicas
(`/projectview/*`) van al `index.html` y el resto cae en un 404 real. En otro
proveedor hay que trasladar esa misma regla a su formato.

---

## Roadmap

Estado actual: el sitio está en producción, con SEO técnico resuelto, contenido
en Contentful y build reproducible. Lo que sigue está ordenado por lo que más
mueve la aguja.

### Ahora — seguridad y confianza

- [ ] **Rotar el token de Contentful y sacarlo del repositorio.** Hoy está
      escrito en `site.config.mjs` (decisión temporal para que el sitio
      funcione sin `.env`) y además sigue en el historial de Git. Generar uno
      nuevo en Contentful, declararlo como variable de entorno en el hosting,
      vaciar el valor por defecto del código y revocar el viejo. Es lo único de
      esta lista que es urgente.
- [ ] Enviar el sitemap a Search Console y Bing (checklist de arriba).

### Siguiente — contenido, que es lo que posiciona

- [ ] **Sección de artículos / blog.** El techo de posicionamiento de un sitio
      de cuatro páginas se alcanza rápido; la publicación regular es la palanca
      real. Contentful ya está integrado, así que es un tipo de contenido nuevo
      más una ruta `/blog/:slug`, reutilizando `RichTextRenderer` y `Seo`.
- [ ] **Prerenderizar las fichas de proyecto.** Hoy `/projectview/:id` recibe
      sus metadatos por JavaScript. Consultando Contentful en build se pueden
      generar HTML estáticos también para ellas, igual que las rutas fijas.
- [ ] **Unificar el idioma.** La interfaz está en español pero las
      descripciones de los proyectos en Contentful están en inglés. Elegir uno,
      o montar i18n español/inglés con `hreflang` — esto último abre el sitio a
      reclutadores fuera de Costa Rica.
- [ ] **Imagen de portada en las tarjetas de proyecto.** El campo `image` ya
      existe en Contentful y solo se usa en el detalle; en el listado aportaría
      mucho visualmente.
- [ ] CV descargable en PDF, enlazado desde la portada y contacto.

### Después — calidad técnica

- [ ] **TypeScript.** La regla `react/prop-types` está desactivada porque el
      proyecto es JavaScript plano; migrar resuelve la tipificación de verdad,
      en vez de con validaciones en tiempo de ejecución.
- [ ] **Pruebas** con Vitest y Testing Library. Prioridad: envío del
      formulario, filtro del buscador de proyectos y estados de error de las
      páginas que consumen Contentful.
- [ ] **CI en GitHub Actions**: `lint` + `build` en cada push, para que un
      fallo no llegue a producción.
- [ ] **Actualizar dependencias de desarrollo.** Vite 5 → 7 y ESLint 8 → 9
      (config plana). Son las dos vulnerabilidades de desarrollo que quedan
      abiertas; producción ya está en cero.
- [ ] React 18 → 19 y Tailwind 3 → 4, ambos con cambios de ruptura.

### Ideas — cuando haya tiempo

- [ ] Modo claro / oscuro con conmutador.
- [ ] Página de detalle con métricas del proyecto (estrellas de GitHub,
      lenguaje principal) leídas de la API de GitHub.
- [ ] Presupuesto de rendimiento con Lighthouse CI.
- [ ] Registro de Core Web Vitals para ver el rendimiento real, no el de
      laboratorio.
- [ ] Feed RSS, si llega el blog.

## Licencia

Ver [LICENCE](LICENCE).
