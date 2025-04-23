const EducationCard = ({ title, school, description, dateStart, dateEnd }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="border border-slate-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-white">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <h6 className="text-sm text-start text-gray-300 italic">
              {school}
            </h6>
          </div>
          <span className="text-sm text-gray-400 italic whitespace-nowrap">
            {formatDate(dateStart)} – {formatDate(dateEnd)}
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-200 leading-relaxed mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
