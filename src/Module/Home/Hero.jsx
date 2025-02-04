import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { PacmanLoader } from "react-spinners";

const Hero = () => {
  return (
    <div className="w-full bg-black h-screen sticky top-0 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Steven Gazo M</h1>
      <h2 className="text-2xl font-extralight opacity-90">
        Junior Developer
      </h2>
      <h2 className="text-xl font opacity-90"> Computer Engineering Student</h2>
      <ul className="flex flex-row gap-4 mt-4">
        <li>
          <a
            href="https://www.linkedin.com/in/stevengazo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/stevengazo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
        </li>
      </ul>
      <div className="flex flex-col m-12 gap-5 justify-center align-middle">
        <h5 className=" font-extralight ">Page Under Construction, come back soon</h5>
        <PacmanLoader className="mx-auto" color="yellow" />
      </div>
    </div>
  );
};

export default Hero;
