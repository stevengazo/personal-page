import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowRight } from "react-icons/fa";
import CodeCard from "./CodeCard";
import { site } from "../../../site.config.mjs";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const socials = [
  {
    Icon: FaLinkedin,
    url: site.social.linkedin,
    label: "Perfil de LinkedIn de Steven Gazo",
  },
  {
    Icon: FaGithub,
    url: site.social.github,
    label: "Perfil de GitHub de Steven Gazo",
  },
  {
    Icon: FaEnvelope,
    url: `mailto:${site.social.email}`,
    label: "Escribir un correo a Steven Gazo",
  },
];

const Hero = () => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="visible"
    className="relative grid items-center gap-12 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16"
  >
    {/* Retícula de fondo, solo decorativa. */}
    <div
      aria-hidden="true"
      className="bg-grid pointer-events-none absolute -inset-x-8 -top-16 bottom-0 -z-10"
    />

    <div className="text-center lg:text-left">
      <motion.p
        variants={item}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Disponible para proyectos
      </motion.p>

      {/* Un unico h1 por pagina: el nombre. El rol va como parrafo destacado,
          no como h2/h3, para no romper la jerarquia de encabezados. */}
      <motion.h1
        variants={item}
        className="mb-4 text-[2.75rem] font-bold leading-[1.05] md:text-6xl lg:text-[4rem]"
      >
        Steven <span className="text-gradient">Gazo</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mb-5 font-display text-xl font-light text-slate-300 md:text-2xl"
      >
        Desarrollador Full Stack
        <span className="mx-2 text-cyan-400">·</span>
        React y .NET
      </motion.p>

      <motion.p
        variants={item}
        className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0"
      >
        Construyo aplicaciones web de principio a fin: interfaces en React y
        TypeScript, APIs en .NET y C#, y la base de datos que las sostiene.
        Estudio Ingeniería en Computación y llevo estos proyectos desde la idea
        hasta producción.
      </motion.p>

      <motion.div
        variants={item}
        className="mb-10 flex flex-wrap justify-center gap-4 lg:justify-start"
      >
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          Ver proyectos
          <FaArrowRight
            size={12}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
        <Link
          to="/contacts"
          className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-300"
        >
          Contactar
        </Link>
      </motion.div>

      <motion.ul variants={item} className="flex justify-center gap-3 lg:justify-start">
        {socials.map(({ Icon, url, label }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/40 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <Icon size={18} />
            </a>
          </li>
        ))}
      </motion.ul>
    </div>

    <motion.div variants={item} className="flex justify-center lg:justify-end">
      <CodeCard />
    </motion.div>
  </motion.div>
);

export default Hero;
