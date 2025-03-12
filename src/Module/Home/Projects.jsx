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
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="sm:h-full md:h-screen sticky top-0 flex flex-col items-center bg-teal-950 p-4">
        <h2 className="text-white text-3xl mb-4">Proyectos</h2>

        {/* Contenedor de proyectos con scroll si hay muchos */}
        <div className="w-full h-2/4 p-4 md:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4  lg:place-items-center sm:gap-10 md:gap-7">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="w-full">
                <ProjectCard
                  id={project.sys.id}
                  title={project.fields.projectTitle}
                  sortDescription={project.fields.sortDescription}
                  description={project.fields.description}
                  tags={project.fields.tags}
                  gitHub={project.fields.gitHub}
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No hay proyectos disponibles.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
