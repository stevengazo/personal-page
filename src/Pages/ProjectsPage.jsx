import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import client from "../client/contentful";
import Seo from "../Components/Seo";
import PageLoader from "../Components/PageLoader";
import PageHeader from "../Components/PageHeader";
import ProjectCard from "../Components/ProjectCard";
import ProjectTable from "../Components/ProjectsTable";
import { site, routes } from "../../site.config.mjs";

const meta = routes.find((route) => route.path === "/projects");

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({
          content_type: "projects",
          // Ordenar en el servidor evita traer todo y reordenar en el cliente.
          order: "-sys.createdAt",
          limit: 200,
        });

        if (!cancelled) setProjects(response.items);
      } catch (err) {
        console.error("Error fetching projects:", err);
        if (!cancelled) setError("No se pudieron cargar los proyectos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return projects;

    return projects.filter(({ fields }) => {
      const haystack = [
        fields.projectTitle,
        fields.sortDescription,
        fields.description,
        ...(Array.isArray(fields.tags) ? fields.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [projects, search]);

  const jsonLd = useMemo(() => {
    if (!projects.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta.title,
      description: meta.description,
      url: `${site.url}/projects`,
      inLanguage: "es",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.fields.projectTitle,
          url: `${site.url}/projectview/${project.sys.id}`,
        })),
      },
    };
  }, [projects]);

  const toggleClasses = (active) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      active ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`;

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/projects"
        keywords={["proyectos React", "proyectos .NET", "portafolio Steven Gazo"]}
        jsonLd={jsonLd}
      />

      <section className="w-full py-8 text-white">
        <PageHeader
          eyebrow="Portafolio"
          title="Mis"
          highlight="proyectos"
          subtitle="Aplicaciones web, APIs y herramientas que he construido. Cada ficha
            enlaza al detalle técnico y, cuando está disponible, al repositorio."
        />

        {loading ? (
          <PageLoader label="Cargando proyectos…" />
        ) : error ? (
          <p role="alert" className="py-16 text-center text-red-400">
            {error}
          </p>
        ) : (
          <>
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="w-full max-w-2xl">
                <label htmlFor="buscar-proyectos" className="sr-only">
                  Buscar proyectos por nombre, descripción o tecnología
                </label>
                <input
                  id="buscar-proyectos"
                  type="search"
                  placeholder="Buscar por nombre o tecnología…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-3" role="group" aria-label="Forma de visualización">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                  className={toggleClasses(view === "grid")}
                >
                  Tarjetas
                </button>
                <button
                  type="button"
                  onClick={() => setView("table")}
                  aria-pressed={view === "table"}
                  className={toggleClasses(view === "table")}
                >
                  Tabla
                </button>
              </div>

              <p aria-live="polite" className="text-sm text-slate-400">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                {search.trim() && ` para “${search.trim()}”`}
              </p>
            </div>

            {filteredProjects.length === 0 ? (
              <p className="py-12 text-center italic text-slate-300">
                No se encontraron proyectos con ese criterio.
              </p>
            ) : view === "grid" ? (
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.li key={project.sys.id} variants={itemVariants} className="h-full">
                    <ProjectCard
                      id={project.sys.id}
                      title={project.fields.projectTitle}
                      sortDescription={project.fields.sortDescription}
                      description={project.fields.description}
                      tags={project.fields.tags}
                      gitHub={project.fields.gitHub}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <ProjectTable projects={filteredProjects} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ProjectsPage;
