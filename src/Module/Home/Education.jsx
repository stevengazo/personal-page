import React, { useEffect, useState } from "react";
import EducationCard from "../../Components/EducationCard";
// import CourseCard from "../../Components/CourseCard"; // ← lo incluirás cuando lo tengas listo
import client from "../../client/contentful";

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [courses, setCourses] = useState([]); // ← si luego decides traerlos de Contentful

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await client.getEntries({ content_type: "education" });
        const sorted = response.items.sort((a, b) => {
          const dateA = new Date(a.fields.dateStart);
          const dateB = new Date(b.fields.dateStart);
          return dateB - dateA;
        });
        setEducations(sorted);
      } catch (error) {
        console.error("Error al cargar educación:", error);
      }
    };

    fetchEducations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 px-4 py-16 space-y-24">
      {/* Educación Section */}
      <section className="w-full max-w-5xl text-center">
        <h2 className="text-white text-4xl font-bold mb-8">Educación</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {educations.length > 0 ? (
            educations.map((edu, ind) => {
              const { title, description, school, dateStart, dateEnd } = edu.fields;
              return (
                <EducationCard
                  key={ind}
                  title={title}
                  description={description}
                  school={school}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                />
              );
            })
          ) : (
            <p className="text-white">No hay información educativa disponible.</p>
          )}
        </div>
      </section>

      {/* Cursos Section */}
      <section className="w-full max-w-5xl text-center">
        <h2 className="text-white text-4xl font-bold mb-8">Cursos</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Aquí irán tus CourseCard en el futuro */}
          {/* Por ahora, solo mostramos un mensaje temporal */}
          <p className="text-white italic opacity-70">Próximamente se agregarán los cursos...</p>
        </div>
      </section>
    </div>
  );
};

export default Education;
