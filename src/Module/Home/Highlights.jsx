import { FaLaptopCode, FaServer, FaMobileAlt } from "react-icons/fa";
import Section from "./Section";

const highlights = [
  {
    Icon: FaLaptopCode,
    title: "Aplicaciones web",
    text: "Interfaces en React con Tailwind: rápidas, responsivas y accesibles, conectadas a la API que las alimenta.",
  },
  {
    Icon: FaServer,
    title: "APIs y backend",
    text: "Servicios REST en .NET y C#, con su modelo de datos, autenticación y la base SQL que los sostiene.",
  },
  {
    Icon: FaMobileAlt,
    title: "Apps móviles",
    text: "Aplicaciones Android con .NET MAUI, integradas contra los mismos servicios que la web.",
  },
];

const Highlights = () => (
  <Section
    id="titulo-servicios"
    eyebrow="Qué hago"
    title="Del navegador a la base de datos"
    subtitle="Trabajo el ciclo completo, no solo una capa."
  >
    <ul className="grid gap-6 md:grid-cols-3">
      {highlights.map(({ Icon, title, text }, index) => (
        <li key={title} className="card-glow group p-6">
          <div className="relative flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400/20">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-3xl font-bold text-slate-700/70 transition-colors group-hover:text-cyan-400/30"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export default Highlights;
