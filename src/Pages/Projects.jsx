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
        console.log(response.items)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* Full screen height with sticky top position */}
      <div className="sm:h-full md:h-screen sticky flex md:items-center justify-center sm:items-start md:gap-0 bg-teal-950  box-content">
        <h2 className="text-white absolute top-6 text-3xl rounded-md  ">
          Proyectos
        </h2>
        <div className=" w-full mx-4 p-5 md:justify-around sm:justify-start sm:align-top gap-3 sm:w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center sm:overflow-y-auto">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
           
              <ProjectCard
                id={project.fields.projectId}
                key={index}
                title={project.fields.projectTitle}
                sortDescription={project.fields.sortDescription}
                description={project.fields.description}
                tags={project.fields.tags}
                gitHub={project.fields.gitHub}
              />
            ))
          ) : (
            <p>No hay proyectos disponibles.</p> // Manejo de estado vacío
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
