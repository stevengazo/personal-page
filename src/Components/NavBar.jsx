import { Link } from "react-scroll";

const NavBar = () => {
  const navItems = [
    { id: "Hero", label: "Home" },
    { id: "Education", label: "Education" },
    { id: "Projects", label: "Projects" },
    { id: "Contacts", label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 shadow-lg">
      <ul className="flex justify-center items-center gap-6 sm:gap-10 h-16 text-white text-sm font-light tracking-wide">
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <Link
              to={id}
              smooth
              duration={500}
              spy
              offset={-50}
              activeClass="text-blue-400 font-semibold after:w-full"
              className="relative cursor-pointer transition-all duration-300 hover:text-blue-400 hover:font-semibold"
            >
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
