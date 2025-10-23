import React, { useEffect, useState } from "react";
import client from "../../client/contentful";
import ProjectCard from "../../Components/ProjectCard";
import { RotateLoader } from "react-spinners";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "projects" });
        const sorted = response.items.sort(
          (a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt)
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 via-teal-950 to-black overflow-hidden relative">
        <RotateLoader color="#FACC15" size={36} />
        {/* Fondo animado mientras carga */}
        <div className="absolute w-72 h-72 bg-teal-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-teal-700/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 via-teal-950 to-black overflow-hidden relative">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen relative text-white px-6 py-16 flex flex-col items-center
      bg-gradient-to-br from-teal-900 via-teal-950 to-black overflow-hidden"
    >
      {/* Fondos decorativos sutiles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-teal-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-teal-700/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-teal-900/10 rounded-full top-[20%] left-[50%] animate-bounce-slow" />
        <div className="absolute w-64 h-64 bg-teal-800/10 rounded-full bottom-[10%] right-[30%] animate-bounce-slow" />
      </div>

      <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-12 text-center border-b border-slate-700 pb-2">
        Proyectos
      </h2>

      <div className="relative z-10 w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.sys.id}
              id={project.sys.id}
              title={project.fields.projectTitle}
              sortDescription={project.fields.sortDescription}
              description={project.fields.description}
              tags={project.fields.tags}
              gitHub={project.fields.gitHub}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300 italic">
            No hay proyectos disponibles.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
