import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Navbar fijo */}
      <NavBar />

      {/* Contenido */}
      <main className=" ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;