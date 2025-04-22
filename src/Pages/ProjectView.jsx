import { useParams } from "react-router-dom";
import RichTextRendered from "../Components/RichTextRenderer";
import { FaGithub } from "react-icons/fa";
import client from "../client/contentful";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const entry = await client.getEntry(id);
        setProject(entry);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        // Delay to show the loader a bit
        setTimeout(() => setLoading(false), 1000);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-700 flex flex-col justify-center items-center gap-4">
        <RotateLoader size={36} color="white" />
        <p className="text-white italic animate-bounce font-light">Loading</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen w-screen bg-slate-700 flex items-center justify-center text-white">
        <p className="text-lg">No project found.</p>
      </div>
    );
  }

  const { projectTitle, description, gitHub, tags, full } = project.fields;

  return (
    <div className="bg-slate-700 min-h-screen w-screen flex flex-col items-center py-10 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-3 justify-center items-center px-4">
        <h1 className="text-white font-semibold text-3xl text-center">{projectTitle}</h1>
        {gitHub && (
          <a
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-110 transition-transform duration-300"
            aria-label="GitHub Repository"
          >
            <FaGithub size={32} />
          </a>
        )}
      </div>

      {description && (
        <p className="text-white my-3 italic text-center text-sm max-w-xl">{description}</p>
      )}

      {tags?.length > 0 && (
        <ul className="flex flex-wrap gap-2 m-4 justify-center">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="text-white border rounded px-2 py-0.5 text-xs italic bg-slate-600 opacity-80 max-w-full truncate"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="text-white w-full max-w-4xl px-4 md:px-8 mb-8">
        <RichTextRendered richText={full} />
      </div>
    </div>
  );
};

export default ProjectView;
