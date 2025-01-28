
import { Link } from "react-router-dom";

const NavBarGeneral = ()=>{
    return<>
    <div className=" fixed bottom-0 z-20 h-16 w-full flex justify-center opacity-75 items-center bg-slate-950">
      <ul className="text-white font-light flex flex-row gap-8">
        <Link to="/" smooth duration={500} className="hover:font-semibold hover:scale-105 cursor-pointer hover:text-blue-400 hover:mx-4 transition-all duration-750">
          Home
        </Link>
        <Link to="/" smooth duration={500} className="hover:font-semibold hover:scale-105 cursor-pointer hover:text-blue-400  hover:mx-4 transition-all duration-750">
          Education
        </Link>
        <Link to="/" smooth duration={500} className="hover:font-semibold hover:scale-105 cursor-pointer hover:text-blue-400  hover:mx-4 transition-all duration-750">
          Projects
        </Link>
        <Link to="/" smooth duration={500}  className="hover:font-semibold hover:scale-105 cursor-pointer hover:text-blue-400  hover:mx-4 transition-all duration-750">
          Contact
        </Link>
      </ul>
    </div>
    </>
}

export default NavBarGeneral;