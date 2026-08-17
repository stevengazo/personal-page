const CourseCard = ({ title, school, information }) => (
  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/50 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10">
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10"
    />

    <div className="relative flex flex-col gap-3">
      <div>
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-300 sm:text-xl">
          {title}
        </h3>
        {school && <p className="mt-0.5 text-sm italic text-slate-400">{school}</p>}
      </div>

      {information && (
        <p className="text-sm leading-relaxed text-slate-300">{information}</p>
      )}
    </div>
  </div>
);

export default CourseCard;
