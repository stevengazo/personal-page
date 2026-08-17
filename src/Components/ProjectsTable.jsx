import { Link } from "react-router-dom";
import { motion } from "motion/react";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, when: "beforeChildren", staggerChildren: 0.04 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ProjectTable = ({ projects }) => (
  <motion.div
    variants={tableVariants}
    initial="hidden"
    animate="visible"
    className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg"
  >
    <table className="min-w-full text-left text-sm text-slate-300">
      <caption className="sr-only">
        Listado de proyectos con su descripción, tecnologías, estado y repositorio
      </caption>

      <thead className="bg-slate-800 text-xs uppercase tracking-wider text-slate-400">
        <tr>
          <th scope="col" className="px-5 py-4">Proyecto</th>
          <th scope="col" className="px-5 py-4">Descripción</th>
          <th scope="col" className="px-5 py-4">Tecnologías</th>
          <th scope="col" className="px-5 py-4 text-center">Estado</th>
          <th scope="col" className="px-5 py-4 text-center">Repositorio</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-800">
        {projects.map((item) => {
          const { projectTitle, description, isActive, gitHub, tags } = item.fields;
          // Contentful no garantiza que `tags` venga definido en cada entrada.
          const tagList = Array.isArray(tags) ? tags : [];

          return (
            <motion.tr
              key={item.sys.id}
              variants={rowVariants}
              className="transition-colors hover:bg-slate-800/60"
            >
              <th scope="row" className="px-5 py-4 text-left font-semibold text-white">
                <Link
                  to={`/projectview/${item.sys.id}`}
                  className="transition-colors hover:text-cyan-300"
                >
                  {projectTitle}
                </Link>
              </th>

              <td className="max-w-xs truncate px-5 py-4 text-slate-400" title={description}>
                {description}
              </td>

              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-5 py-4 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                      : "border border-slate-500/30 bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {isActive ? "Activo" : "Archivado"}
                </span>
              </td>

              <td className="px-5 py-4 text-center">
                {gitHub ? (
                  <a
                    href={gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver el repositorio de ${projectTitle} en GitHub`}
                    className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Ver repo →
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">—</span>
                )}
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  </motion.div>
);

export default ProjectTable;
