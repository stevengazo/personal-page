import React, { useEffect, useState } from "react";
import EducationCard from "../../Components/EducationCard";
import CourseCard from "../../Components/CourseCard"
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

    const fetchCourses = async () => {
      try{
        const response = await client.getEntries({ content_type: "courses" });
        const sorted = response.items.sort((a, b) => {
          const dateA = new Date(a.fields.dateStart);
          const dateB = new Date(b.fields.dateStart);
          return dateB - dateA;
        });
        setCourses(sorted);
      }catch(error){
        console.error("Error al cargar cursos:", error);
      } 
    }

    fetchCourses();
    fetchEducations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 px-4 py-16 space-y-24">
      {/* Educación Section */}
      <section className="w-full max-w-5xl text-center">
        <h2 className="text-white text-4xl font-bold mb-8">Education</h2>
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
            <p className="text-white"></p>
          )}
        </div>
      </section>

      {/* Cursos Section */}
      <section className="w-full max-w-5xl text-center">
        <h2 className="text-white text-4xl font-bold mb-8">Courses</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {courses.length > 0 ? (
            courses.map((course, ind) => {
              const { title, information, school } = course.fields;
              return (
                <CourseCard
                  key={ind}
                  title={title}
                  school={school}
                  information ={information}
                />
              );
            })
          ) : (
            <p className="text-white"></p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Education;
