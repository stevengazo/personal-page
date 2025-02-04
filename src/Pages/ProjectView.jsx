import { useParams } from "react-router-dom";

import client from "../client/contentful";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  if (id != null) {
    useEffect(() => {
      try {
        setLoading(true);
        client
          .getEntry(id)
          .then((entry) => {
            setProject(entry);
            console.log(entry);
          })
          .catch(console.error);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }, []);
  }

  useEffect(() => console.log(project), [project]);
  return (
    <>
      <div className="bg-slate-700 w-screen h-screen  flex flex-col justify-start items-center py-10 overflow-y-auto">
        {loading && (
          <div className="h-screen flex flex-col justify-center items-center gap-4">
            <RotateLoader size={36} color="white" />
            <p className="text-white italic transition duration-700 animate-bounce font-light">
              Loading
            </p>
          </div>
        )}
        {!loading && (
          <>
            <h1 className="mx-auto text-white font-medium text-3xl">
              {project && project.fields.projectTitle}
            </h1>

            <label className="text-white my-3 italic text-center text-sm">
              {project && project.fields.description}
            </label>
            <ul className="flex flex-wrap gap-2 m-2">
              {project &&  project.fields.tags.map((tag, index) => (
                <li
                  key={index}
                  className="text-white border rounded-sm p-0.5 text-sm italic bg-slate-600 opacity-50 max-w-full truncate"
                >
                  {tag}
                </li>
              ))}
            </ul>
           {
             project &&  <a className="text-white italic text-sm font-light hover:font-normal transition duration-700" target="_blank"  href={project.fields.gitHub}>
            Code to the repository
          </a>
           }
          </>
        )}
      </div>
    </>
  );
};

export default ProjectView;
