import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { site } from "../../site.config.mjs";

const internalLinks = [
  { to: "/", label: "Inicio" },
  { to: "/education", label: "Formación" },
  { to: "/projects", label: "Proyectos" },
  { to: "/contacts", label: "Contacto" },
  // Subdominios propios: se navegan con un <a>, no con el router.
  ...site.subdomains.map(({ label, url }) => ({ to: url, label, external: true })),
];

const socialLinks = [
  { href: site.social.github, label: "GitHub", Icon: FaGithub },
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: `mailto:${site.social.email}`, label: "Correo electrónico", Icon: FaEnvelope },
];

const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950/60 px-4 py-10 text-sm text-slate-400 backdrop-blur-sm sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p>
        © {new Date().getFullYear()} {site.fullName} · {site.jobTitle}
      </p>

      {/* Enlaces internos en el pie: ayudan al rastreo desde cualquier pagina. */}
      <nav aria-label="Navegación del pie de página">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {internalLinks.map(({ to, label, external }) => (
            <li key={label}>
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan-300"
                >
                  {label}
                </a>
              ) : (
                <Link to={to} className="transition-colors hover:text-cyan-300">
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex gap-5">
        {socialLinks.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-block transition-colors hover:text-cyan-300"
            >
              <Icon size={20} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
