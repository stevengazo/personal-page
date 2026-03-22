import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import client from "../client/contentful";
import ProjectCard from "../Components/ProjectCard";
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "projects" });
        const sorted = response.items.sort(
          (a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen   overflow-hidden">
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
      className="w-full min-h-screen relative  text-white px-6 py-16 flex flex-col items-center
       to-black overflow-hidden"
    >
 

      {/* Título animado */}
      <motion.h2
        variants={titleVariants}
        className="relative z-10 text-4xl md:text-5xl font-bold mb-12 text-center border-b border-slate-700 pb-2"
      >
        Proyectos
      </motion.h2>

      {/* Grid animado */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300 italic">
            No hay proyectos disponibles.
          </p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProjectsPage;
