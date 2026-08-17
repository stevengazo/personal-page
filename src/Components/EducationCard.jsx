const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("es-ES", { year: "numeric", month: "long" }).format(date);
};

const EducationCard = ({ title, school, description, dateStart, dateEnd }) => {
  const start = formatDate(dateStart);
  const end = dateEnd ? formatDate(dateEnd) : "Presente";

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10"
      />

      <div className="relative flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-300 sm:text-xl">
              {title}
            </h3>
            {/* Antes era un <h6>, que rompia la jerarquia de encabezados: el
                centro de estudios es un dato de la tarjeta, no una seccion. */}
            {school && <p className="text-sm italic text-slate-400">{school}</p>}
          </div>

          {start && (
            <span className="whitespace-nowrap text-xs italic text-slate-400 sm:text-sm">
              {start} – {end}
            </span>
          )}
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
