import { useState } from "react";
import { motion } from "framer-motion";
import ContactCard from "../Components/ContactCard";
import { FaWhatsapp, FaMailBulk, FaLinkedin, FaGithub } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ContactPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://formspree.io/f/mwpvbzzp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Consulta enviada correctamente.");
        e.target.reset();
      } else {
        setMessage("Hubo un error al enviar el formulario.");
      }
    } catch {
      setMessage("Error de conexión.");
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full min-h-screen relative flex flex-col items-center justify-center px-8 py-16
      bg-gradient-to-b from-cyan-950 via-teal-950 to-black overflow-hidden"
    >
      {/* Fondos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-cyan-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-teal-800/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
      </div>

      {/* Título */}
      <motion.h2
        variants={titleVariants}
        className="relative z-10 text-4xl md:text-5xl font-bold mb-12 text-center border-b border-slate-700 pb-2 text-white"
      >
        Contact
      </motion.h2>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Links */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
        >
          <h3 className="text-cyan-950 text-2xl font-bold mb-6">
            Contact Links
          </h3>

          <ul className="w-full space-y-4">
            {[
              {
                title: "Whatsapp",
                icon: FaWhatsapp,
                url: "https://wa.me/86279806",
                user: "stevengazo",
              },
              {
                title: "Linkedin",
                icon: FaLinkedin,
                url: "https://www.linkedin.com/in/stevengazo/",
                user: "stevengazo",
              },
              {
                title: "Email",
                icon: FaMailBulk,
                url: "mailto:steven.gazo@hotmail.com",
                user: "steven.gazo@hotmail.com",
              },
              {
                title: "GitHub",
                icon: FaGithub,
                url: "https://github.com/stevengazo",
                user: "stevengazo",
              },
            ].map((item, i) => (
              <motion.li key={i} variants={itemVariants}>
                <ContactCard
                  title={item.title}
                  _icon={item.icon}
                  url={item.url}
                  username={item.user}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Formulario */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg w-full flex flex-col"
        >
          <h3 className="text-cyan-950 text-2xl font-bold mb-4">
            Send me a Message
          </h3>

          <p className="italic text-gray-500 mb-6">
            If you have an idea or need to contact me, send me a message.
          </p>

          <div className="mb-4">
            <label className="block text-cyan-950 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 transition"
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
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-950 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Write your message here"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 transition"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-cyan-950 text-white p-3 rounded-lg hover:bg-cyan-900 transition-colors"
          >
            Send
          </motion.button>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 mt-4 text-center"
            >
              {message}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
};
export default ContactPage;
