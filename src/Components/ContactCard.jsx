const ContactCard = ({ title, _icon: Icon, url, username }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir perfil de ${title}`}
      className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors duration-300">
        <Icon size={28} />
      </div>

      <div className="flex flex-col">
        <span className="text-slate-800 font-medium text-sm group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </span>
        <span className="text-xs text-slate-500 italic truncate max-w-[180px]">
          {username}
        </span>
      </div>
    </a>
  );
};

export default ContactCard;
