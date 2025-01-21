const ProjectCard = ({ title }) => {
  return (
    <>
      <div className="border border-white h-40 rounded-md p-3 w-64 hover:bg-teal-900 duration-500 transition">
        <h5 className="text-white text-xl">{title}</h5>
        <p className="text-white text-sm italic">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </div>

    </>
  );
};

export default ProjectCard;
