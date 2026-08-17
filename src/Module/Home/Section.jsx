import { motion } from "motion/react";

/**
 * Envoltorio comun de las secciones de la portada: mismo ritmo vertical, misma
 * separacion y misma animacion de entrada para todas.
 */
const Section = ({ id, eyebrow, title, subtitle, children, action }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    aria-labelledby={id}
    className="border-t border-white/[0.07] py-16"
  >
    <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            <span aria-hidden="true" className="h-px w-8 bg-cyan-400/50" />
            {eyebrow}
          </p>
        )}

        <h2 id={id} className="text-2xl font-bold text-white md:text-4xl">
          {title}
        </h2>

        {subtitle && <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </header>

    {children}
  </motion.section>
);

export default Section;
