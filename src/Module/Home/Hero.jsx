import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

// 🔥 Variantes
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen flex flex-col items-center justify-center text-white px-4 text-center relative"
    >
      {/* ✨ Glow sutil detrás */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full top-1/3 left-1/2 -translate-x-1/2 -z-10" />

      {/* Header */}
      <motion.header variants={item} className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
          Steven Gazo M
        </h1>

        <h2 className="text-xl md:text-2xl font-light opacity-90 mb-1">
          Junior Developer
        </h2>

        <h3 className="text-lg md:text-xl opacity-70">
          Computer Engineering Student
        </h3>
      </motion.header>

      {/* Social Links */}
      <motion.nav variants={item}>
        <ul className="flex gap-6 mt-6">
          {[
            {
              icon: FaLinkedin,
              url: "https://www.linkedin.com/in/stevengazo/",
              hover: "hover:text-blue-500",
            },
            {
              icon: FaGithub,
              url: "https://github.com/stevengazo",
              hover: "hover:text-gray-400",
            },
            {
              icon: FaTwitter,
              url: "https://twitter.com/tuusuario",
              hover: "hover:text-blue-400",
            },
          ].map(({ icon: Icon, url, hover }, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${hover} transition duration-300`}
              >
                <Icon size={32} />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Footer */}
      <motion.footer
        variants={item}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <p className="text-sm font-light text-gray-400 tracking-wide">
          Welcome to my portfolio
        </p>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <PacmanLoader color="#FACC15" size={12} />
        </motion.div>
      </motion.footer>
    </motion.section>
  );
};

export default Hero;