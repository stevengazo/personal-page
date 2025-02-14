import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const RichTextRenderer = ({ richText }) => {
  const options = {
    renderNode: {
      // Aplicar estilos Tailwind a los párrafos
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),

      // Aplicar estilos Tailwind a los encabezados
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl font-bold mb-6 ">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-bold mb-5 ">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl font-bold mb-4 ">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-xl font-bold mb-3 ">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-lg font-bold mb-2 ">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-base font-bold mb-1 ">{children}</h6>
      ),

      // Aplicar estilos Tailwind a las imágenes incrustadas
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        return (
          <img
          src={file.url}
         
          sizes="(max-width: 600px) 480px, 800px"
          alt={description || title}
          className="my-6 rounded-lg max-w-full md:max-w-md mx-auto"
          loading="lazy"
        />
        );
      },

      // Manejar listas (ordenadas y desordenadas)
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-5 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-5 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-2">{children}</li>
      ),
    },
  };

  return (
    <div className="prose max-w-2xl mx-auto">
      {documentToReactComponents(richText, options)}
    </div>
  );
};

export default RichTextRenderer;
