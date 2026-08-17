import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Seo from "../Components/Seo";
import Hero from "../Module/Home/Hero.jsx";
import Highlights from "../Module/Home/Highlights.jsx";
import TechStack from "../Module/Home/TechStack.jsx";
import { site, routes } from "../../site.config.mjs";

// Diferido a proposito: arrastra el cliente de Contentful, que no debe pesar
// en el bundle inicial de una seccion que esta por debajo del pliegue.
const FeaturedProjects = lazy(() => import("../Module/Home/FeaturedProjects.jsx"));

const home = routes.find((route) => route.path === "/");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: { "@id": `${site.url}/#person` },
  url: `${site.url}/`,
  name: home.title,
  description: home.description,
  inLanguage: "es",
};

const Home = () => (
  <>
    <Seo
      title={home.title}
      description={home.description}
      path="/"
      keywords={[
        "Steven Gazo",
        "desarrollador full stack Costa Rica",
        "programador React",
        "desarrollador .NET",
        "portafolio desarrollador web",
      ]}
      jsonLd={jsonLd}
    />

    <Hero />

    <Highlights />

    <Suspense fallback={null}>
      <FeaturedProjects />
    </Suspense>

    <TechStack />

    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      aria-labelledby="titulo-cta"
      className="border-t border-white/[0.07] py-16"
    >
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-blue-600/10 px-6 py-14 text-center">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"
        />

        <div className="relative">
          <h2 id="titulo-cta" className="mb-3 text-2xl font-bold text-white md:text-4xl">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-300">
            Contame qué necesitás y te digo cómo lo abordaría. Respondo por
            correo, LinkedIn o WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contacts"
              className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Escribime
            </Link>
            <Link
              to="/education"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-300"
            >
              Ver mi formación
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  </>
);

export default Home;
