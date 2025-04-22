import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

const Hero = () => {
  return (
    <section className="w-full h-screen bg-black flex flex-col items-center justify-center text-white px-4 text-center">
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Steven Gazo M</h1>
        <h2 className="text-xl md:text-2xl font-light opacity-90">Junior Developer</h2>
        <h3 className="text-lg md:text-xl opacity-70">Computer Engineering Student</h3>
      </header>

      <nav>
        <ul className="flex gap-6 mt-4">
          <li>
            <a
              href="https://www.linkedin.com/in/stevengazo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/stevengazo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={28} />
            </a>
          </li>
        </ul>
      </nav>

      <footer className="mt-10 flex flex-col items-center gap-4">
        <p className="text-sm font-extralight text-gray-300">
          Página en construcción, ¡vuelve pronto!
        </p>
        <PacmanLoader color="yellow" />
      </footer>
    </section>
  );
};

export default Hero;
