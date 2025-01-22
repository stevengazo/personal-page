import ContactCard from "../Components/ContactCard";
import {
  FaWhatsapp,
  FaMailBulk,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const Hero = () => {
  return (
    <>
      {/* Full screen height with sticky top position */}
      <div className="h-screen sticky flex flex-col items-center justify-center top- bg-cyan-950">
        {/* White text for the heading with 3xl size */}
        <h2 className="text-white  absolute top-6 text-3xl">Contact</h2>
        <div>
          <ul className="flex md:flex-row sm:flex-col gap-4">
            <ContactCard
              title={"Whatsapp"}
              _icon={FaWhatsapp}
              url={"https://wa.me/86279806"}
              username={"stevengazo"}
            />

            <ContactCard
              title={"Linkedin"}
              _icon={FaLinkedin}
              url={"https://www.linkedin.com/in/stevengazo/"}
              username={"stevengazo"}
            />
            <ContactCard
              title={"Email"}
              _icon={FaMailBulk}
              url={"mailto:steven.gazo@hotmail.com"}
              username={"stevengazo.gazo@hotmail.com"}
            />
            <ContactCard
              title={"GitHub"}
              _icon={FaGithub}
              url={"https://github.com/stevengazo"}
              username={"stevengazo"}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hero;
