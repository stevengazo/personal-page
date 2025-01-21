const ProjectCard = ({ title, sortDescription }) => {
  return (
    <>
      <div className="border border-white md:h-40 rounded-md p-3 w-64 sm:w-full sm:h-16 hover:bg-slate-800 duration-500 transition">
        <h5 className="text-white text-xl sm:text-sm sm:font-semibold">{title}</h5>
        <p className="sm:block md:hidden text-white text-sm hidden italic">
            {sortDescription}
        </p>
        <p className="text-white text-sm italic  sm:hidden md:block ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </div>

    </>
  );
};

export default ProjectCard;
