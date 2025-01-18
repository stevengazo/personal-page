



const NavBar = () => {
    return (
      <div className="flex flex-row justify-between bg-blue-950 h-full p-4">
        <h1 className="text-white text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300">
          Home
        </h1>
        <ul className="text-white flex flex-row gap-6">
          <li className="hover:font-semibold hover:text-blue-400  transition-all duration-300">
            Education
          </li>
          <li className="hover:font-semibold hover:text-blue-400 transition-all duration-300">
            Projects
          </li>
          <li className="hover:font-semibold hover:text-blue-400 transition-all duration-300">
            Contact
          </li>
        </ul>
      </div>
    );
  };
  

export default NavBar