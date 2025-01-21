import React, { useEffect, useState } from "react";
import client from "../client/contentful";

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
        <h2 className="text-white top-6 text-3xl">Proyectos</h2>
        <ul>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <li className="text-white" key={project.sys.id}>
                <h3>{project.fields.projectTitle}</h3>
              </li>
            ))
          ) : (
            <p>No hay proyectos disponibles.</p> // Manejo de estado vacío
          )}
        </ul>
      </div>
    </>
  );
};

export default Projects;
