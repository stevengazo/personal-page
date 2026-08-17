import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-cyan-300">
        {text}
      </code>
    ),
  },

  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="mb-5 leading-relaxed text-slate-200">{children}</p>
    ),

    // El <h1> lo aporta el titulo del proyecto, asi que el cuerpo del articulo
    // arranca en <h2> y la jerarquia de la pagina queda coherente.
    [BLOCKS.HEADING_1]: (_, children) => (
      <h2 className="mb-6 border-b border-slate-600 pb-2 text-3xl font-bold text-white">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="mb-5 mt-8 text-2xl font-semibold text-white">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="mb-4 mt-6 text-xl font-semibold text-white">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <h4 className="mb-3 mt-5 text-lg font-medium text-slate-100">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_, children) => (
      <h5 className="mb-2 mt-4 text-base font-medium text-slate-200">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_, children) => (
      <h6 className="mb-2 mt-4 text-sm font-medium uppercase tracking-wide text-slate-400">
        {children}
      </h6>
    ),

    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="mb-5 border-l-4 border-cyan-400/60 bg-slate-800/40 py-2 pl-4 italic text-slate-300">
        {children}
      </blockquote>
    ),

    [BLOCKS.HR]: () => <hr className="my-10 border-slate-700" />,

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      // Un asset sin publicar llega como referencia sin resolver: sin esta
      // guarda, leer `.fields` rompe el render de todo el articulo.
      const fields = node.data?.target?.fields;
      if (!fields?.file?.url) return null;

      const { title, description, file } = fields;
      const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
      const { width, height } = file.details?.image ?? {};

      return (
        <figure className="my-8">
          <img
            src={url}
            alt={description || title || ""}
            // Las dimensiones reservan el espacio y evitan saltos de layout.
            width={width}
            height={height}
            className="mx-auto h-auto max-w-full rounded-xl shadow-lg"
            loading="lazy"
            decoding="async"
          />
          {description && (
            <figcaption className="mt-3 text-center text-xs italic text-slate-400">
              {description}
            </figcaption>
          )}
        </figure>
      );
    },

    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-slate-200">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-slate-200">{children}</ol>
    ),
    // Contentful parte el contenido de una vinneta en varios parrafos (un tramo
    // de texto, un enlace, el texto siguiente...). Como <p> es de bloque, cada
    // tramo caia en su propia linea y partia la frase. Dentro de un <li> se
    // muestran en linea para que la vinneta se lea como una sola frase.
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className="leading-relaxed [&>p]:mb-0 [&>p]:inline">{children}</li>
    ),

    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;
      const isExternal = /^https?:\/\//.test(url);

      return (
        <a
          href={url}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-cyan-400 underline underline-offset-2 transition-colors hover:text-cyan-300"
        >
          {children}
        </a>
      );
    },
  },
};

const RichTextRenderer = ({ richText }) => {
  if (!richText) return null;

  return (
    <div className="mx-auto max-w-3xl">{documentToReactComponents(richText, options)}</div>
  );
};

export default RichTextRenderer;
