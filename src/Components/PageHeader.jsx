/**
 * Cabecera comun de las paginas interiores.
 *
 * Repite el lenguaje de las secciones de la portada (etiqueta de acento sobre
 * el titulo) para que el sitio se lea como una sola pieza, y evita duplicar el
 * mismo bloque en cada pagina.
 */
const PageHeader = ({ eyebrow, title, highlight, subtitle }) => (
  <header className="mb-12 text-center">
    {eyebrow && (
      <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        <span aria-hidden="true" className="h-px w-8 bg-cyan-400/50" />
        {eyebrow}
        <span aria-hidden="true" className="h-px w-8 bg-cyan-400/50" />
      </p>
    )}

    <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
      {title}
      {highlight && <span className="text-gradient"> {highlight}</span>}
    </h1>

    {subtitle && <p className="mx-auto max-w-2xl text-slate-400">{subtitle}</p>}
  </header>
);

export default PageHeader;
