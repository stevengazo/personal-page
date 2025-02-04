const ContactCard = ({ title, _icon, url, username }) => {
  return (
    <>
      <div  className=" hover:text-gray-600 scale-105 transition duration-500">
        <a href={url}  className=" flex-row flex gap-3 justify-center items-center">
        {<_icon size={32} />}
          <h6 className="">{title}</h6>
          <h6 className="italic">{username}</h6>
        </a>
      </div>
    </>
  );
};

export default ContactCard;
