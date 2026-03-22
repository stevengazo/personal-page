import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EducationCard from "../Components/EducationCard";
import CourseCard from "../Components/CourseCard";
import client from "../client/contentful";

// 🔥 Variantes
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const EducationPage = () => {
  const [educations, setEducations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [eduRes, courseRes] = await Promise.all([
          client.getEntries({ content_type: "education" }),
          client.getEntries({ content_type: "courses" }),
        ]);

        const sortByDateDesc = (items) =>
          items.sort(
            (a, b) =>
              new Date(b.fields.dateStart) - new Date(a.fields.dateStart)
          );

        setEducations(sortByDateDesc(eduRes.items));
        setCourses(sortByDateDesc(courseRes.items));
      } catch (err) {
        console.error("Error al cargar educación o cursos:", err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-lg"
        >
          Cargando...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen relative px-4 py-16 flex flex-col items-center space-y-10"
    >
      {/* 🎓 Educación */}
      <section className="w-full max-w-5xl text-center">
        <motion.h2
          variants={titleVariants}
          className="text-white text-4xl font-bold mb-8 border-b border-slate-700 pb-2 inline-block"
        >
          Education
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6"
        >
          {educations.length > 0 ? (
            educations.map((edu, idx) => {
              const { title, description, school, dateStart, dateEnd } =
                edu.fields;

              return (
                <motion.div key={idx} variants={itemVariants}>
                  <EducationCard
                    title={title}
                    description={description}
                    school={school}
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                  />
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 italic">
              No hay registros de educación.
            </p>
          )}
        </motion.div>
      </section>

      {/* 📚 Cursos */}
      <section className="w-full max-w-5xl text-center">
        <motion.h2
          variants={titleVariants}
          className="text-white text-4xl font-bold mb-8 border-b border-slate-700 pb-2 inline-block"
        >
          Courses
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6"
        >
          {courses.length > 0 ? (
            courses.map((course, idx) => {
              const { title, information, school } = course.fields;

              return (
                <motion.div key={idx} variants={itemVariants}>
                  <CourseCard
                    title={title}
                    school={school}
                    information={information}
                  />
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 italic">
              No hay cursos registrados.
            </p>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default EducationPage;