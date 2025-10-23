import { Link, useLocation } from "react-router-dom";

const NavBarGeneral = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/", label: "Education" },
    { path: "/", label: "Projects" },
    { path: "/", label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 z-20 w-full h-16 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
      <ul className="flex justify-center items-center h-full gap-8 text-white font-light">
        {links.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                className={`relative px-2 text-sm md:text-base transition-all duration-300
                  ${isActive ? "text-blue-400 font-medium" : "hover:text-blue-400 hover:scale-105"}
                `}
              >
                {label}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 mx-auto w-2 h-1 bg-blue-400 rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBarGeneral;
