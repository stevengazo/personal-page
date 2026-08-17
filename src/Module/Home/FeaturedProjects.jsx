import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import client from "../../client/contentful";
import ProjectCard from "../../Components/ProjectCard";
import Section from "./Section";

const HOW_MANY = 3;

/** Marcador de posicion con la misma altura que una tarjeta real. */
const Skeleton = () => (
  <li
    aria-hidden="true"
    className="h-56 animate-pulse rounded-2xl border border-slate-700/40 bg-slate-800/30"
  />
);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    client
      .getEntries({ content_type: "projects", order: "-sys.createdAt", limit: HOW_MANY })
      .then((response) => {
        if (!cancelled) setProjects(response.items);
      })
      .catch((error) => {
        console.error("Error fetching featured projects:", error);
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Si Contentful no responde, la portada sigue siendo util sin esta seccion:
  // mejor omitirla que mostrar un error en la primera pantalla del sitio.
  if (failed || (!loading && projects.length === 0)) return null;

  return (
    <Section
      id="titulo-destacados"
      eyebrow="Trabajo"
      title="Proyectos destacados"
      subtitle="Una muestra de lo último que he construido."
      action={
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan-400 hover:text-cyan-300"
        >
          Ver todos
          <FaArrowRight
            size={11}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: HOW_MANY }, (_, index) => <Skeleton key={index} />)
          : projects.map((project) => (
              <li key={project.sys.id} className="h-full">
                <ProjectCard
                  id={project.sys.id}
                  title={project.fields.projectTitle}
                  sortDescription={project.fields.sortDescription}
                  description={project.fields.description}
                  tags={project.fields.tags}
                  gitHub={project.fields.gitHub}
                />
              </li>
            ))}
      </ul>
    </Section>
  );
};

export default FeaturedProjects;
