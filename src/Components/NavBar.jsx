import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { site } from "../../site.config.mjs";

// `external: true` marca los destinos que viven fuera de esta SPA: se navegan
// con un <a> normal, no con el router, y abren en una pestana aparte.
const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/education", label: "Formación" },
  { to: "/projects", label: "Proyectos" },
  ...site.subdomains.map(({ label, url }) => ({ to: url, label, external: true })),
  { to: "/contacts", label: "Contacto" },
];

const baseLink = [
  "relative py-1 transition-colors duration-300 hover:text-cyan-300",
  // El subrayado se anima desde el propio enlace: antes dependia de un
  // `group-hover` sin contenedor `group`, asi que nunca llegaba a verse.
  "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-cyan-400",
  "after:transition-all after:duration-300 hover:after:w-full",
].join(" ");

const linkClasses = ({ isActive }) =>
  `${baseLink} ${isActive ? "text-cyan-400 after:w-full" : "after:w-0"}`;

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Cerrar el menu al navegar y al pulsar Escape.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-white"
      >
        <Link to="/" className="text-lg font-semibold tracking-wide" aria-label="Ir al inicio">
          Steven Gazo<span className="text-cyan-400">.</span>
        </Link>

        {/* Escritorio */}
        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {navItems.map(({ to, label, external }) => (
            <li key={label}>
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseLink} inline-flex items-center gap-1.5 after:w-0`}
                >
                  {label}
                  <FaExternalLinkAlt size={9} aria-hidden="true" className="opacity-60" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              ) : (
                <NavLink to={to} end={to === "/"} className={linkClasses}>
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Movil */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="rounded-lg p-2 text-white transition-colors hover:text-cyan-300 lg:hidden"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {open && (
        <ul
          id="menu-movil"
          className="flex flex-col gap-1 border-t border-slate-800 bg-slate-950/95 px-6 py-4 text-sm lg:hidden"
        >
          {navItems.map(({ to, label, external }) => (
            <li key={label}>
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-white transition-colors hover:bg-white/5"
                >
                  {label}
                  <FaExternalLinkAlt size={9} aria-hidden="true" className="opacity-60" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              ) : (
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 transition-colors ${
                      isActive ? "bg-white/5 text-cyan-400" : "text-white hover:bg-white/5"
                    }`
                  }
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default NavBar;
