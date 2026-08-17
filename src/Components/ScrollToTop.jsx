import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * En una SPA el navegador conserva la posicion de scroll al cambiar de ruta,
 * asi que una pagina nueva puede abrirse por la mitad. Esto la lleva al inicio.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
