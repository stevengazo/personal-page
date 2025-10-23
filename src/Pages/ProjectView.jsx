import { useParams } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import { RotateLoader } from "react-spinners";
import client from "../client/contentful";

// Lazy load del componente RichTextRendered
const RichTextRendered = lazy(() => import("../Components/RichTextRenderer"));

const ProjectView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const entry = await client.getEntry(id);
        setProject(entry);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 via-slate-900 to-black gap-4 relative overflow-hidden">
        <RotateLoader size={36} color="#FACC15" />
        <p className="text-white italic font-light animate-pulse">Cargando...</p>
        {/* Difuminados animados */}
        <div className="absolute w-72 h-72 bg-indigo-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-indigo-700/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white relative overflow-hidden">
        <p className="text-lg">No se encontró el proyecto.</p>
      </div>
    );
  }

  const { projectTitle, description, gitHub, tags, full } = project.fields;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center py-10 overflow-y-auto relative
      bg-gradient-to-br from-slate-800 via-slate-900 to-black"
    >
      {/* Difuminados de fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-indigo-800/20 rounded-full top-[-60px] left-[-60px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-indigo-700/20 rounded-full bottom-[-120px] right-[-120px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-indigo-900/10 rounded-full top-[25%] left-[60%] animate-bounce-slow" />
        <div className="absolute w-72 h-72 bg-indigo-800/10 rounded-full bottom-[15%] right-[25%] animate-bounce-slow" />
      </div>

      {/* Contenido */}
      <header className="flex flex-col md:flex-row items-center justify-center gap-3 px-6 mb-6 relative z-10">
        <h1 className="text-white font-bold text-3xl text-center tracking-wide">
          {projectTitle}
        </h1>
        {gitHub && (
          <a
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-110 hover:text-indigo-400 transition-transform duration-300"
            aria-label="Repositorio en GitHub"
          >
            <FaGithub size={32} />
          </a>
        )}
      </header>

      {description && (
        <p className="text-gray-300 text-center italic text-base max-w-3xl md:max-w-4xl lg:max-w-5xl mb-6 px-4 md:px-6 lg:px-10 leading-relaxed relative z-10">
          {description}
        </p>
      )}

      {tags?.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-2 mb-8 px-4 relative z-10">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="bg-slate-700 text-gray-100 border border-slate-600 rounded-full px-3 py-1 text-xs uppercase tracking-wide hover:bg-slate-600 transition-colors"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Contenido Rich Text con Lazy & Suspense */}
      <main className="text-white w-full max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mb-12 relative z-10">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-10">
              <RotateLoader size={24} color="#FACC15" />
            </div>
          }
        >
          <RichTextRendered richText={full} />
        </Suspense>
      </main>
    </div>
  );
};

export default ProjectView;
