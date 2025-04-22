import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, sortDescription, description, tags, gitHub }) => {
  return (
    <div className="border border-white rounded-md hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md bg-opacity-10 backdrop-blur-sm">
      <Link
        to={`/projectview/${id}`}
        className="flex flex-col justify-between h-full p-6 gap-4 hover:bg-gray-800/10 transition-colors duration-300"
      >
        <div>
          <h5 className="text-white text-xl md:text-2xl font-semibold mb-2 text-center">
            {title}
          </h5>
          <p className="text-white text-sm italic md:hidden">{sortDescription}</p>
          <p className="text-white text-sm italic hidden md:block">{description}</p>
        </div>

        <ul className="flex flex-wrap gap-2 mt-4 justify-center">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="text-white text-xs bg-slate-700 rounded px-2 py-0.5 italic opacity-70 truncate max-w-full"
            >
              {tag}
            </li>
          ))}
        </ul>

        {gitHub && (
          <div className="flex justify-center mt-4">
            <a
              href={gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition"
              title="View on GitHub"
            >
              <FaGithub size={24} />
            </a>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProjectCard;
