import React, { useEffect, useState } from "react";
import client from "../client/contentful";
import ProjectCard from "../Components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "projects" }); // Cambia 'post' por el tipo de contenido que usas en Contentful
        setProjects(response.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  console.log(projects);
  return (
    <>
      {/* Full screen height with sticky top position */}
      <div className="h-screen sticky flex items-center justify-center  bg-teal-950">
        {/* White text for the heading with 3xl size */}
        <h2 className="text-white absolute top-6 text-3xl rounded-md">
          Proyectos
        </h2>

        <div className="border md:mx-6 md:p-2 flex  sm:flex-col lg:flex-row sm:w-full sm:mx-4 sm:p-5 sm:justify-start md:gap-3 md:w-full md:h-5/6 md:justify-around md:border-dashed">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:place-items-center lg:place-items-center">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.fields.projectTitle}
                  sortDescription={project.fields.sortDescription}
                />
              ))
            ) : (
              <p>No hay proyectos disponibles.</p> // Manejo de estado vacío
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
