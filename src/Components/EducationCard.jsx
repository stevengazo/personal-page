const EducationCard = ({ title, school, description, dateStart, dateEnd }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="group relative overflow-hidden border border-slate-700/60 bg-slate-800/40 p-6 rounded-2xl shadow-md hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
      {/* Brillo decorativo en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-opacity duration-500" />

      <div className="flex flex-col gap-3 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <h6 className="text-sm text-gray-400 italic">{school}</h6>
          </div>

          {(dateStart || dateEnd) && (
            <span className="text-xs sm:text-sm text-gray-400 italic whitespace-nowrap">
              {formatDate(dateStart)} – {dateEnd ? formatDate(dateEnd) : "Presente"}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-300 leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
