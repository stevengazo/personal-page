import { Link } from "react-router-dom";
import Seo from "../Components/Seo";

/**
 * Un hosting estatico devuelve 200 en cualquier ruta de la SPA, asi que sin un
 * `noindex` explicito Google puede indexar URLs inexistentes como soft 404.
 */
const ErrorPage = () => (
  <>
    <Seo
      title="Página no encontrada | Steven Gazo"
      description="La página que buscas no existe o fue movida."
      noindex
    />

    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-6xl font-bold text-cyan-400">404</p>
      <h1 className="text-2xl font-semibold text-white md:text-3xl">
        Esta página no existe
      </h1>
      <p className="max-w-md text-slate-300">
        Puede que el enlace esté roto o que el contenido se haya movido.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
        >
          Ir al inicio
        </Link>
        <Link
          to="/projects"
          className="rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400 hover:text-cyan-300"
        >
          Ver proyectos
        </Link>
      </div>
    </section>
  </>
);

export default ErrorPage;
