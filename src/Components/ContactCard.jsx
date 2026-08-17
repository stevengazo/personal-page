const ContactCard = ({ title, icon: Icon, url, username }) => {
  const isMail = url?.startsWith("mailto:");

  return (
    <a
      href={url}
      target={isMail ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={`${title}: ${username}`}
      className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-800/70"
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700/60 text-slate-200 transition-colors duration-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300">
        <Icon size={24} aria-hidden="true" />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-cyan-300">
          {title}
        </span>
        <span className="truncate text-xs text-slate-400">{username}</span>
      </span>

      <span
        aria-hidden="true"
        className="ml-auto text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
      >
        →
      </span>
    </a>
  );
};

export default ContactCard;
