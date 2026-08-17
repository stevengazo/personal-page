import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Seo from "../Components/Seo";
import PageLoader from "../Components/PageLoader";
import PageHeader from "../Components/PageHeader";
import EducationCard from "../Components/EducationCard";
import CourseCard from "../Components/CourseCard";
import client from "../client/contentful";
import { site, routes } from "../../site.config.mjs";

const meta = routes.find((route) => route.path === "/education");

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const EducationPage = () => {
  const [educations, setEducations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchContent = async () => {
      try {
        const [eduRes, courseRes] = await Promise.all([
          client.getEntries({ content_type: "education", limit: 100 }),
          client.getEntries({ content_type: "courses", limit: 200 }),
        ]);

        // Copia antes de ordenar: `items` viene del cliente de Contentful y
        // ordenarlo en sitio muta la respuesta cacheada.
        const byDateDesc = (items) =>
          [...items].sort(
            (a, b) => new Date(b.fields.dateStart ?? 0) - new Date(a.fields.dateStart ?? 0)
          );

        if (!cancelled) {
          setEducations(byDateDesc(eduRes.items));
          setCourses(byDateDesc(courseRes.items));
        }
      } catch (err) {
        console.error("Error al cargar educación o cursos:", err);
        if (!cancelled) setError("No se pudieron cargar los datos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const jsonLd = useMemo(() => {
    if (!educations.length && !courses.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: `${site.url}/education`,
      name: meta.title,
      description: meta.description,
      inLanguage: "es",
      mainEntity: {
        "@id": `${site.url}/#person`,
        "@type": "Person",
        alumniOf: educations.map(({ fields }) => ({
          "@type": "EducationalOrganization",
          name: fields.school,
        })),
        hasCredential: courses.map(({ fields }) => ({
          "@type": "EducationalOccupationalCredential",
          name: fields.title,
          recognizedBy: fields.school
            ? { "@type": "Organization", name: fields.school }
            : undefined,
        })),
      },
    };
  }, [educations, courses]);

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/education"
        keywords={["formación", "cursos", "ingeniería en computación", "Steven Gazo"]}
        jsonLd={jsonLd}
      />

      <div className="w-full py-8">
        <PageHeader
          eyebrow="Trayectoria"
          title="Formación y"
          highlight="cursos"
          subtitle="Mi formación académica y los cursos con los que he ido ampliando el
            stack, del desarrollo web a las tecnologías .NET."
        />

        {loading ? (
          <PageLoader label="Cargando formación…" />
        ) : error ? (
          <p role="alert" className="py-16 text-center text-red-400">
            {error}
          </p>
        ) : (
          <div className="space-y-16">
            <section aria-labelledby="titulo-educacion">
              <h2
                id="titulo-educacion"
                className="mb-8 border-b border-slate-700 pb-2 text-2xl font-bold text-white md:text-3xl"
              >
                Educación
              </h2>

              {educations.length > 0 ? (
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2"
                >
                  {educations.map((edu) => (
                    <motion.li key={edu.sys.id} variants={itemVariants}>
                      <EducationCard {...edu.fields} />
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="italic text-slate-400">No hay registros de educación.</p>
              )}
            </section>

            <section aria-labelledby="titulo-cursos">
              <h2
                id="titulo-cursos"
                className="mb-8 border-b border-slate-700 pb-2 text-2xl font-bold text-white md:text-3xl"
              >
                Cursos
              </h2>

              {courses.length > 0 ? (
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2"
                >
                  {courses.map((course) => (
                    <motion.li key={course.sys.id} variants={itemVariants}>
                      <CourseCard {...course.fields} />
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="italic text-slate-400">No hay cursos registrados.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default EducationPage;
