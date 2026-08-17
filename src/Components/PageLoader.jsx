import { RotateLoader } from "react-spinners";

/** Estado de carga compartido por las rutas diferidas y las paginas de datos. */
const PageLoader = ({ label = "Cargando…" }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-8"
  >
    <RotateLoader color="#38bdf8" size={18} />
    <p className="text-sm font-light italic text-slate-400">{label}</p>
  </div>
);

export default PageLoader;
