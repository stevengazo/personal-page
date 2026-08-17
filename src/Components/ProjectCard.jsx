import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, title, sortDescription, description, tags = [], gitHub }) => {
  const summary = description || sortDescription;

  return (
    <article className="card-glow group flex h-full flex-col overflow-hidden p-6">
      <div className="relative flex flex-1 flex-col">
        <h3 className="mb-3 text-lg font-semibold text-white transition-colors group-hover:text-cyan-300">
          {/* Enlace "estirado": el ::after cubre la tarjeta entera, asi todo el
              bloque es clicable sin anidar el enlace de GitHub dentro de otro
              <a>, que es HTML invalido y rompe la navegacion por teclado. */}
          <Link to={`/projectview/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>

        {summary && (
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {summary}
          </p>
        )}

        {tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-slate-700/70 bg-slate-800/70 px-2 py-1 font-mono text-[11px] text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-700/50 pt-4">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors group-hover:text-cyan-300">
          Ver detalle
          <FaArrowRight
            size={10}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </span>

        {gitHub && (
          <a
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver el repositorio de ${title} en GitHub`}
            className="text-slate-400 transition-colors hover:text-cyan-300"
          >
            <FaGithub size={18} />
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
