import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaGithub, FaArrowLeft } from "react-icons/fa";
import Seo from "../Components/Seo";
import PageLoader from "../Components/PageLoader";
import client from "../client/contentful";
import { site } from "../../site.config.mjs";

const RichTextRenderer = lazy(() => import("../Components/RichTextRenderer"));

const ProjectView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setProject(null);

    const fetchProject = async () => {
      try {
        const entry = await client.getEntry(id);
        if (!cancelled) setProject(entry);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        // Sin retraso artificial: el spinner dura lo que dura la peticion.
        if (!cancelled) setLoading(false);
      }
    };

    if (id) fetchProject();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <PageLoader label="Cargando proyecto…" />;

  if (!project) {
    return (
      <>
        {/* Un proyecto inexistente no debe entrar al indice de busqueda. */}
        <Seo
          title="Proyecto no encontrado | Steven Gazo"
          description="El proyecto que buscas no existe o ya no está publicado."
          noindex
        />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg text-white">No se encontró el proyecto.</p>
          <Link to="/projects" className="text-cyan-400 transition hover:text-cyan-300">
            ← Volver a proyectos
          </Link>
        </div>
      </>
    );
  }

  const { projectTitle, description, gitHub, tags, full, image } = project.fields;
  const tagList = Array.isArray(tags) ? tags : [];
  const path = `/projectview/${id}`;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : site.ogImage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectTitle,
    description,
    url: `${site.url}${path}`,
    inLanguage: "es",
    author: { "@id": `${site.url}/#person` },
    keywords: tagList.join(", ") || undefined,
    dateModified: project.sys.updatedAt,
    ...(gitHub ? { codeRepository: gitHub } : {}),
  };

  return (
    <article className="w-full py-8">
      <Seo
        title={`${projectTitle} | Proyectos de Steven Gazo`}
        description={description || `Proyecto ${projectTitle} desarrollado por Steven Gazo.`}
        path={path}
        image={imageUrl}
        type="article"
        keywords={tagList}
        jsonLd={jsonLd}
      />

      <Link
        to="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
      >
        <FaArrowLeft size={12} aria-hidden="true" /> Volver a proyectos
      </Link>

      <header className="mb-6 flex flex-col items-center justify-center gap-3 px-2 md:flex-row">
        <h1 className="text-center text-3xl font-bold tracking-wide text-white">
          {projectTitle}
        </h1>
        {gitHub && (
          <a
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-transform duration-300 hover:scale-110 hover:text-cyan-300"
            aria-label={`Ver el repositorio de ${projectTitle} en GitHub`}
          >
            <FaGithub size={28} />
          </a>
        )}
      </header>

      {description && (
        <p className="mx-auto mb-6 max-w-3xl px-2 text-center text-base italic leading-relaxed text-slate-300">
          {description}
        </p>
      )}

      {tagList.length > 0 && (
        <ul className="mb-10 flex flex-wrap justify-center gap-2 px-2">
          {tagList.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-100"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mx-auto w-full max-w-4xl px-2 text-white sm:px-4">
        <Suspense fallback={<PageLoader label="Cargando contenido…" />}>
          <RichTextRenderer richText={full} />
        </Suspense>
      </div>
    </article>
  );
};

export default ProjectView;
