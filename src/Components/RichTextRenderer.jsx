import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const RichTextRenderer = ({ richText }) => {
  if (!richText) return null;

  const options = {
    renderNode: {
      // 📖 Párrafos
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="text-gray-200 dark:text-gray-300 leading-relaxed mb-5">
          {children}
        </p>
      ),

      // 🧭 Encabezados jerárquicos
      [BLOCKS.HEADING_1]: (_, children) => (
        <h1 className="text-4xl font-bold text-white dark:text-blue-300 mb-6 border-b border-slate-600 pb-2">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="text-3xl font-semibold text-white dark:text-blue-200 mb-5">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className="text-2xl font-semibold text-white dark:text-blue-100 mb-4">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <h4 className="text-xl font-medium text-gray-100 mb-3">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (_, children) => (
        <h5 className="text-lg font-medium text-gray-300 mb-2">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (_, children) => (
        <h6 className="text-base font-medium text-gray-400 mb-1">
          {children}
        </h6>
      ),

      // 🖼️ Imágenes
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const url = file?.url?.startsWith("https:")
          ? file.url
          : `https:${file.url}`;

        return (
          <figure className="my-8 flex justify-center">
            <img
              src={url}
              alt={description || title || "Imagen del artículo"}
              className="rounded-xl shadow-lg max-w-full md:max-w-2xl object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            {description && (
              <figcaption className="text-xs text-gray-400 mt-2 text-center italic">
                {description}
              </figcaption>
            )}
          </figure>
        );
      },

      // 📋 Listas
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-200">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-200">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (_, children) => (
        <li className="leading-relaxed">{children}</li>
      ),
    },
  };

  return (
    <article className="prose prose-invert max-w-3xl mx-auto text-white dark:prose-dark">
      {documentToReactComponents(richText, options)}
    </article>
  );
};

export default RichTextRenderer;
