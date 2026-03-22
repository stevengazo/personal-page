import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../Components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* 🔥 Fondo dinámico tipo aurora */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-blue-500/10 rounded-full top-[30%] left-[40%] blur-3xl animate-bounce-slow" />
      </div>

      {/* Navbar */}
      <NavBar />

      {/* Contenido */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto 
          bg-white/5 backdrop-blur-2xl 
          border border-white/10 
          rounded-3xl 
          p-6 sm:p-8 
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;
