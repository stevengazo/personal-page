import { Link } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { id: "/", label: "Home" },
    { id: "/Education", label: "Education" },
    { id: "/Projects", label: "Projects" },
    { id: "/Contacts", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-white">
        {/* Logo / Marca */}
        <h1 className="font-semibold text-lg tracking-wide">
          Dev<span className="text-blue-400">.</span>
        </h1>

        {/* Links */}
        <ul className="flex items-center gap-6 sm:gap-10 text-sm">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <Link
                to={id}
                className="relative cursor-pointer transition-all duration-300 hover:text-blue-400"
              >
                {label}

                {/* Línea animada */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
