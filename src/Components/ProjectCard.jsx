import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({
  id,
  title,
  sortDescription,
  description,
  tags,
  gitHub,
}) => {
  return (
    <div className="border rounded sm:my-5 md:my-0 sm:h-5/6 md:h-full border-white md:justify-center md:align-middle">
      <Link
        to={`/projectview/${id}`}
        className="flex flex-col justify-center items-center p-4 h-full"
      >
        <a href={gitHub} target="_blank" className="absolute top-2 right-2">
          <FaGithub
            size={20}
            className="text-white hover:scale-110 duration-300 transition"
          />
        </a>
        <h5 className="text-white text-3xl sm:text-sm sm:font-semibold">
          {title}
        </h5>
        <p className="sm:block md:hidden text-white text-sm hidden italic">
          {sortDescription}
        </p>
        <p className="text-white text-sm italic sm:hidden md:block">
          {description}
        </p>

        <ul className="flex flex-wrap gap-2 m-2">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="text-white border rounded-sm p-0.5 text-sm italic bg-slate-600 opacity-50 max-w-full truncate"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ProjectCard;
