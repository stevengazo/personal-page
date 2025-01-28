import ContactCard from "../../Components/ContactCard";
import {
  FaWhatsapp,
  FaMailBulk,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un backend o servicio de correo.
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data); // Muestra los datos del formulario en la consola
    alert("Consulta enviada correctamente.");
  };

  return (
    <>
      {/* Full screen height with sticky top position */}
      <div className="h-screen sticky flex flex-col items-center justify-center top- bg-cyan-950">
        {/* White text for the heading with 3xl size */}
        <h2 className="text-white absolute top-6 text-3xl">Contact</h2>

        {/* Contenedor para las tarjetas de contacto y el formulario */}
        <div className="flex flex-col gap-4 justify-around w-3/4 mx-auto justify-center items-center sm:flex-col md:flex-col lg:flex-row transition duration-500 ease-in-out">
          {/* Tarjetas de contacto */}
          <div className="h-full flex flex-col justify-around items-center border rounded-md p-2">
            <h3 className="text-white  text-center my-6 text-xl font-medium">
              Contact Links
            </h3>
            <ul className="flex flex-col sm:flex-col gap-4 mb-10">
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
                username={"steven.gazo@hotmail.com"}
              />
              <ContactCard
                title={"GitHub"}
                _icon={FaGithub}
                url={"https://github.com/stevengazo"}
                username={"stevengazo"}
              />
            </ul>
          </div>

          {/* Formulario de consulta */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-cyan-950 mb-4">
              Send me a Message
            </h3>
            <p className="italic text-white text-gray-500">If you have an idea our need to contact me, send me a message</p>
            <div className="mb-4">
              <label className="block text-cyan-950 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-950 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-950 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="4"
                placeholder="Write your message here"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-950 text-white p-2 rounded-lg hover:bg-cyan-900 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;