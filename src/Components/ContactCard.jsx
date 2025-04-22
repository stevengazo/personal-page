const ContactCard = ({ title, _icon: Icon, url, username }) => {
  return (
    <div className="transition-transform duration-300 hover:scale-105 hover:text-gray-600">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <Icon size={32} />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs italic text-gray-500">{username}</span>
        </div>
      </a>
    </div>
  );
};

export default ContactCard;
