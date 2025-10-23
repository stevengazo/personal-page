import React, { useEffect, useState } from "react";
import EducationCard from "../../Components/EducationCard";
import CourseCard from "../../Components/CourseCard";
import client from "../../client/contentful";

const Education = () => {
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
            (a, b) => new Date(b.fields.dateStart) - new Date(a.fields.dateStart)
          );

        setEducations(sortByDateDesc(eduRes.items));
        setCourses(sortByDateDesc(courseRes.items));
      } catch (err) {
        console.error("Error al cargar educación o cursos:", err);
        setError("No se pudieron cargar los datos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-950 via-teal-950 to-black relative overflow-hidden">
        <p className="text-white text-lg animate-pulse">Cargando...</p>
        {/* Fondo animado */}
        <div className="absolute w-72 min-h-screen bg-teal-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 min-h-screen bg-teal-700/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-950 via-teal-950 to-black relative overflow-hidden">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative px-4 py-16 flex flex-col items-center space-y-24
      bg-gradient-to-br from-cyan-950 via-teal-950 to-black overflow-hidden"
    >
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-teal-800/20 rounded-full top-[-50px] left-[-50px] animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-teal-700/20 rounded-full bottom-[-100px] right-[-100px] animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-teal-900/10 rounded-full top-[20%] left-[50%] animate-bounce-slow" />
        <div className="absolute w-64 h-64 bg-teal-800/10 rounded-full bottom-[10%] right-[30%] animate-bounce-slow" />
      </div>

      {/* Educación Section */}
      <section className="w-full max-w-5xl text-center relative z-10">
        <h2 className="text-white text-4xl font-bold mb-8 border-b border-slate-700 pb-2 inline-block">
          Education
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {educations.length > 0 ? (
            educations.map((edu, idx) => {
              const { title, description, school, dateStart, dateEnd } = edu.fields;
              return (
                <EducationCard
                  key={idx}
                  title={title}
                  description={description}
                  school={school}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                />
              );
            })
          ) : (
            <p className="text-gray-400 italic">No hay registros de educación.</p>
          )}
        </div>
      </section>

      {/* Cursos Section */}
      <section className="w-full max-w-5xl text-center relative z-10">
        <h2 className="text-white text-4xl font-bold mb-8 border-b border-slate-700 pb-2 inline-block">
          Courses
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {courses.length > 0 ? (
            courses.map((course, idx) => {
              const { title, information, school } = course.fields;
              return (
                <CourseCard
                  key={idx}
                  title={title}
                  school={school}
                  information={information}
                />
              );
            })
          ) : (
            <p className="text-gray-400 italic">No hay cursos registrados.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Education;
