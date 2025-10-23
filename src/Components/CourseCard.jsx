const EducationCard = ({ title, school, information }) => {
  return (
    <div className="group relative overflow-hidden border border-slate-700/70 bg-slate-800/50 p-6 rounded-2xl shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Sutil brillo al hacer hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-400 to-transparent transition-opacity duration-500" />

      <div className="flex flex-col gap-3 relative z-10">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <h6 className="text-sm text-gray-400 italic mt-0.5">{school}</h6>
        </div>

        {information && (
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            {information}
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
