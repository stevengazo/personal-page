import { useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import Seo from "../Components/Seo";
import ContactCard from "../Components/ContactCard";
import PageHeader from "../Components/PageHeader";
import { site, routes, credentials } from "../../site.config.mjs";

const meta = routes.find((route) => route.path === "/contacts");
const FORMSPREE_ID = credentials.formspreeId;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const channels = [
  { title: "WhatsApp", icon: FaWhatsapp, url: site.social.whatsapp, user: "+506 8627 9806" },
  { title: "LinkedIn", icon: FaLinkedin, url: site.social.linkedin, user: "stevengazo" },
  { title: "Correo", icon: FaEnvelope, url: `mailto:${site.social.email}`, user: site.social.email },
  { title: "GitHub", icon: FaGithub, url: site.social.github, user: "stevengazo" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contacts`,
  name: meta.title,
  description: meta.description,
  inLanguage: "es",
  mainEntity: {
    "@id": `${site.url}/#person`,
    "@type": "Person",
    email: `mailto:${site.social.email}`,
    sameAs: [site.social.github, site.social.linkedin],
  },
};

const labelClasses = "mb-2 block text-sm font-medium text-slate-200";

const fieldClasses =
  "w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-white outline-none transition " +
  "placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900";

const cardClasses =
  "flex flex-col rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 backdrop-blur-sm sm:p-8";

const ContactPage = () => {
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.target;
    const data = Object.fromEntries(new FormData(form));

    // Trampa antispam: los bots rellenan todos los campos, las personas no ven
    // este porque esta oculto. Si viene con contenido, se descarta en silencio.
    if (data.company) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Sin esto Formspree responde con una redireccion HTML en vez de JSON.
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/contacts"
        keywords={["contacto", "desarrollador web Costa Rica", "Steven Gazo"]}
        jsonLd={jsonLd}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full py-8"
      >
        <PageHeader
          eyebrow="Hablemos"
          title="Ponete en"
          highlight="contacto"
          subtitle="¿Tenés una idea, una vacante o una consulta técnica? Escribime por el
            canal que prefieras y te respondo."
        />

        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <motion.section
            variants={itemVariants}
            aria-labelledby="titulo-canales"
            className={cardClasses}
          >
            <h2 id="titulo-canales" className="mb-2 text-2xl font-bold text-white">
              Canales directos
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              La vía más rápida es WhatsApp o correo.
            </p>

            <ul className="space-y-3">
              {channels.map(({ title, icon, url, user }) => (
                <li key={title}>
                  <ContactCard title={title} icon={icon} url={url} username={user} />
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 border-t border-slate-700/60 pt-6 text-sm text-slate-400">
              <span
                aria-hidden="true"
                className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400"
              />
              Disponible para nuevos proyectos · Costa Rica (GMT−6)
            </p>
          </motion.section>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            aria-labelledby="titulo-formulario"
            className={cardClasses}
          >
            <h2 id="titulo-formulario" className="mb-2 text-2xl font-bold text-white">
              Enviame un mensaje
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              Contame en qué estás trabajando y te contesto al correo que dejés.
            </p>

            <div className="mb-4">
              <label htmlFor="name" className={labelClasses}>
                Nombre
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className={fieldClasses}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={labelClasses}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                className={fieldClasses}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className={labelClasses}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Escribí tu mensaje aquí"
                className={`${fieldClasses} resize-y`}
              />
            </div>

            {/* Honeypot: oculto a la vista y fuera del orden de tabulación. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">No completar este campo</label>
              <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <motion.button
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </motion.button>

            <p aria-live="polite" className="mt-4 min-h-[1.5rem] text-center text-sm">
              {status === "success" && (
                <span className="text-emerald-400">
                  Mensaje enviado. Te respondo pronto.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-400">
                  No se pudo enviar. Escribime a {site.social.email}.
                </span>
              )}
            </p>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;
