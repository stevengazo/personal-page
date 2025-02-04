import ContactCard from "../../Components/ContactCard";
import {
  FaWhatsapp,
  FaMailBulk,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    alert("Consulta enviada correctamente.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-950 p-8">
      {/* Header */}
      <h2 className="text-white text-4xl font-bold mb-8">Contact</h2>

      {/* Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Links */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-cyan-950 text-2xl font-bold mb-6">Contact Links</h3>
          <ul className="w-full space-y-4">
            <ContactCard title="Whatsapp" _icon={FaWhatsapp} url="https://wa.me/86279806" username="stevengazo" />
            <ContactCard title="Linkedin" _icon={FaLinkedin} url="https://www.linkedin.com/in/stevengazo/" username="stevengazo" />
            <ContactCard title="Email" _icon={FaMailBulk} url="mailto:steven.gazo@hotmail.com" username="steven.gazo@hotmail.com" />
            <ContactCard title="GitHub" _icon={FaGithub} url="https://github.com/stevengazo" username="stevengazo" />
          </ul>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-cyan-950 text-2xl font-bold mb-4">Send me a Message</h3>
          <p className="italic text-gray-500 mb-4">If you have an idea or need to contact me, send me a message.</p>
          <div className="mb-4">
            <label className="block text-cyan-950 font-medium mb-2">Name</label>
            <input type="text" name="name" required className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-950 font-medium mb-2">Email</label>
            <input type="email" name="email" required className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your email" />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-950 font-medium mb-2">Message</label>
            <textarea name="message" required className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Write your message here"></textarea>
          </div>
          <button type="submit" className="w-full bg-cyan-950 text-white p-2 rounded-lg hover:bg-cyan-900 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
