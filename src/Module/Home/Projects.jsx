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
        <div className="w-full  p-5 grid grid-cols-1 m md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                id={project.sys.id}
                key={index}
                title={project.fields.projectTitle}
                sortDescription={project.fields.sortDescription}
                description={project.fields.description}
                tags={project.fields.tags}
                gitHub={project.fields.gitHub}
              />
            ))
          ) : (
            <p className="text-white text-center">No hay proyectos disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
