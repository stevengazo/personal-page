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
      <div className="h-screen sticky flex flex-col items-center justify-center bg-teal-950">
        {/* White text for the heading with 3xl size */}
        <h2 className="text-white absolute top-6 text-3xl rounded-md">
          Proyectos
        </h2>

        <div className="border border-white p-2 flex gap-1 w-full h-5/6  justify-around border-dashed">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard title={project.fields.projectTitle}></ProjectCard>
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
