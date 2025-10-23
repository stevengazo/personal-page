import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-black via-slate-900 to-black flex flex-col items-center justify-center text-white px-4 text-center">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
          Steven Gazo M
        </h1>
        <h2 className="text-xl md:text-2xl font-light opacity-90 mb-1">
          Junior Developer
        </h2>
        <h3 className="text-lg md:text-xl opacity-70">
          Computer Engineering Student
        </h3>
      </header>

      {/* Social Links */}
      <nav>
        <ul className="flex gap-6 mt-6">
          <li>
            <a
              href="https://www.linkedin.com/in/stevengazo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transform hover:scale-110 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={32} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/stevengazo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transform hover:scale-110 transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={32} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transform hover:scale-110 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={32} />
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer Loader */}
      <footer className="mt-12 flex flex-col items-center gap-4">
        <p className="text-sm font-light text-gray-400">
          Welcome to my portfolio
        </p>
        <PacmanLoader color="#FACC15" size={12} />
      </footer>
    </section>
  );
};

export default Hero;
