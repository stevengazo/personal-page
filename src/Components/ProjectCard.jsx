import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, sortDescription, description, tags = [], gitHub }) => {
  return (
    <div className="group relative border border-slate-700/70 bg-slate-800/60 rounded-2xl p-6 shadow-md hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm overflow-hidden">
      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Link to={`/projectview/${id}`} className="relative flex flex-col justify-between h-full z-10">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg md:text-xl font-semibold text-white text-center group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 text-sm italic text-center mt-2 leading-relaxed">
            <span className="block md:hidden">{sortDescription}</span>
            <span className="hidden md:block">{description}</span>
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2 mt-3">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="px-2 py-1 text-xs bg-slate-700/80 text-gray-200 rounded-full italic hover:bg-slate-600/80 transition-colors truncate"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* GitHub link */}
        {gitHub && (
          <div className="flex justify-center mt-4">
            <a
              href={gitHub}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver en GitHub"
              className="text-gray-300 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <FaGithub size={26} />
            </a>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProjectCard;
