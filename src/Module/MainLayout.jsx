import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      {/* Fondo tipo aurora. aria-hidden: es decoracion pura. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 h-[30rem] w-[30rem] animate-pulse-slow rounded-full bg-cyan-500/25 blur-[100px]" />
        <div className="absolute -bottom-32 -right-24 h-[34rem] w-[34rem] animate-pulse-slow rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="absolute left-[45%] top-[30%] h-96 w-96 animate-float-slow rounded-full bg-teal-500/15 blur-[100px]" />
      </div>

      <NavBar />

      <main id="contenido" className="flex-1 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <motion.div
          // La clave por ruta reinicia la animacion en cada navegacion.
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8"
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
