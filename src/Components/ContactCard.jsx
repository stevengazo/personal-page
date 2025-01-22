const ContactCard = ({ title, _icon, url, username }) => {
  return (
    <>
      <div >
        <a href={url}  className="text-white flex-row flex gap-3 justify-center align-middle">
        {<_icon size={32} />}
          <h6 className="text-white">{title}</h6>
          <h6 className="italic">{username}</h6>
        </a>
      </div>
    </>
  );
};

export default ContactCard;
