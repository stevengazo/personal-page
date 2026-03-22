import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProjectTable = ({ projects }) => {
  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
    >
      <table className="min-w-full text-sm text-left text-gray-300">
        
        {/* HEADER */}
        <thead className="bg-slate-800 text-gray-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-5 py-4">ID</th>
            <th className="px-5 py-4">Proyecto</th>
            <th className="px-5 py-4">Descripción</th>
            <th className="px-5 py-4">Tags</th>
            <th className="px-5 py-4 text-center">Estado</th>
            <th className="px-5 py-4 text-center">GitHub</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-800">
          {projects.map((item) => {
            const {
              projectId,
              projectTitle,
              description,
              isActive,
              gitHub,
              tags,
            } = item.fields;

            return (
              <motion.tr
                key={projectId}
                variants={rowVariants}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(30,41,59,0.6)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="cursor-default"
              >
                {/* ID */}
                <td className="px-5 py-4 text-gray-400">
                  #{projectId}
                </td>

                {/* TITLE */}
                <td className="px-5 py-4 font-semibold text-white">
                  {projectTitle}
                </td>

                {/* DESCRIPTION */}
                <td
                  className="px-5 py-4 text-gray-400 max-w-xs truncate"
                  title={description}
                >
                  {description}
                </td>

                {/* TAGS */}
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="bg-slate-800 border border-slate-700 text-gray-300 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-5 py-4 text-center">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {isActive ? "Activo" : "Inactivo"}
                  </motion.span>
                </td>

                {/* GITHUB */}
                <td className="px-5 py-4 text-center">
                  <motion.a
                    href={gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
                  >
                    Ver repo →
                  </motion.a>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProjectTable;