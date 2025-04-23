


const EducationCard = ({ title, school, information }) => {
    return (
      <div className="border border-slate-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-white">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <h6 className="text-sm text-start text-gray-300 italic">{school}</h6>
            </div>
          </div>
  
          {information && (
            <p className="text-sm text-start text-gray-200 leading-relaxed mt-2">
              {information}
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default EducationCard;
  