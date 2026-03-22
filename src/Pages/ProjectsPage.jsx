import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import client from "../client/contentful";
import ProjectCard from "../Components/ProjectCard";
import ProjectTable from "../Components/ProjectsTable";
import { RotateLoader } from "react-spinners";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [view, setView] = useState("grid");

  // 🔍 estado del buscador
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({
          content_type: "projects",
        });

        const sorted = response.items.sort(
          (a, b) =>
            new Date(b.sys.createdAt) - new Date(a.sys.createdAt)
        );

        setProjects(sorted);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("No se pudieron cargar los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 🔥 filtro optimizado
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = project.fields.projectTitle?.toLowerCase() || "";
      const description = project.fields.description?.toLowerCase() || "";
      const tags = project.fields.tags?.join(" ").toLowerCase() || "";

      const term = search.toLowerCase();

      return (
        title.includes(term) ||
        description.includes(term) ||
        tags.includes(term)
      );
    });
  }, [projects, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RotateLoader color="#FACC15" size={36} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen text-white px-6 py-16 flex flex-col items-center"
    >
      {/* Título */}
      <motion.h2
        variants={titleVariants}
        className="text-4xl md:text-5xl font-bold mb-8 text-center border-b border-slate-700 pb-2"
      >
        Proyectos
      </motion.h2>

      {/* 🔍 Buscador */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mb-8"
      >
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 outline-none border border-slate-700 focus:border-yellow-400 transition"
        />
      </motion.div>

      {/* Toggle */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            view === "grid"
              ? "bg-yellow-400 text-black"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          Tarjetas
        </button>

        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            view === "table"
              ? "bg-yellow-400 text-black"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          Tabla
        </button>
      </div>

      {/* Contenido */}
      {filteredProjects.length > 0 ? (
        view === "grid" ? (
          <motion.div
            variants={containerVariants}
            className="w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.sys.id} variants={itemVariants}>
                <ProjectCard
                  id={project.sys.id}
                  title={project.fields.projectTitle}
                  sortDescription={project.fields.sortDescription}
                  description={project.fields.description}
                  tags={project.fields.tags}
                  gitHub={project.fields.gitHub}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-7xl"
          >
            <ProjectTable projects={filteredProjects} />
          </motion.div>
        )
      ) : (
        <p className="text-center text-gray-300 italic">
          No se encontraron proyectos.
        </p>
      )}
    </motion.section>
  );
};

export default ProjectsPage;