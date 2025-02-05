import { useParams } from "react-router-dom";
import RichTextRendered from "../Components/RichTextRenderer";
import { FaGithub } from "react-icons/fa";
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
            <div className=" flex flex-row gap-1 justify-around items-center">
              <h1 className="mx-auto text-white font-medium text-3xl">
                {project && project.fields.projectTitle}
              </h1>
              {project && (
                <a
                  target="_blank"
                  href={project.fields.gitHub}
                  className=""
                >
                  <FaGithub
                    size={36}
                    className="text-white hover:scale-110 duration-300 transition"
                  />
                </a>
              )}
            </div>

            <label className="text-white my-3 italic text-center text-sm">
              {project && project.fields.description}
            </label>

            <ul className="flex flex-wrap gap-2 m-2">
              {project &&
                project.fields.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="text-white border rounded-sm p-0.5 text-sm italic bg-slate-600 opacity-50 max-w-full truncate"
                  >
                    {tag}
                  </li>
                ))}
            </ul>

            {project && (
              <div className="text-white w-90 px-8 mb-8 rounded-lg border border-white">
                <RichTextRendered richText={project.fields.full} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectView;
