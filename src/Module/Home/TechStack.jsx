import {
  SiReact,
  SiDotnet,
  SiSharp,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiBlazor,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import Section from "./Section";

// Simple Icons ya no publica el logo de SQL Server (marca registrada), asi que
// esa fila usa un icono generico de base de datos.
const groups = [
  {
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact, color: "text-cyan-400" },
      { name: "TypeScript", Icon: SiTypescript, color: "text-blue-400" },
      { name: "JavaScript", Icon: SiJavascript, color: "text-yellow-400" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-teal-300" },
      { name: "Vite", Icon: SiVite, color: "text-purple-400" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: ".NET", Icon: SiDotnet, color: "text-violet-400" },
      { name: "C#", Icon: SiSharp, color: "text-emerald-400" },
      { name: "Blazor", Icon: SiBlazor, color: "text-indigo-400" },
      { name: "Node.js", Icon: SiNodedotjs, color: "text-green-400" },
    ],
  },
  {
    title: "Datos y herramientas",
    items: [
      { name: "SQL Server", Icon: FaDatabase, color: "text-red-400" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "text-sky-400" },
      { name: "Docker", Icon: SiDocker, color: "text-blue-300" },
      { name: "Git", Icon: SiGit, color: "text-orange-400" },
    ],
  },
];

const TechStack = () => (
  <Section
    id="titulo-stack"
    eyebrow="Stack"
    title="Tecnologías con las que trabajo"
    subtitle="Lo que uso a diario en proyectos propios y de universidad."
  >
    <div className="grid gap-6 md:grid-cols-3">
      {groups.map(({ title, items }) => (
        <div key={title} className="card-glow p-6">
          <div className="relative">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              {title}
            </h3>

            <ul className="flex flex-wrap gap-2">
              {items.map(({ name, Icon, color }) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
                >
                  <Icon size={16} className={color} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default TechStack;
