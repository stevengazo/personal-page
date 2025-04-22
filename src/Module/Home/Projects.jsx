import React, { useEffect, useState } from "react";
import client from "../../client/contentful";
import ProjectCard from "../../Components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "projects" });
        setProjects(response.items);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full min-h-screen bg-teal-950 text-white px-6 py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10 text-center">Proyectos</h2>

      <div className="w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <p className="col-span-full text-center text-gray-300">
            No hay proyectos disponibles.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
