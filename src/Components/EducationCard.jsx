const EducationCard = ({ title, school, description, dateStart, dateEnd }) => {
  return (
    <>
      <div className="bg-slate-800 m-2 w-10/12 gap-2 text-white p-2 rounded-md">
        <div className="flex flex-col ">
          <h5 className=" text-md font-semibold">{title}</h5>
          <div className="flex flex-row gap-2 italic">
            <h6 className=" text-sm">{school}</h6>
            <h6 className=" text-sm">{dateStart}- {dateEnd}</h6>
          </div>
        </div>
        <p className="text-sm">{description}</p>
      </div>
    </>
  );
};

export default EducationCard;
