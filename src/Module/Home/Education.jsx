import React, { useEffect, useState } from "react";
import EducationCard from "../../Components/EducationCard";
import client from "../../client/contentful";

const Education = () => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "education" }); // Cambia 'post' por el tipo de contenido que usas en Contentful
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);



  return (
    <>
      {/* Full screen height with sticky top position */}
      <div className="h-screen sticky top-0 flex flex-col items-center justify-center bg-neutral-900">
        {/* White text for the heading with 3xl size and additional spacing */}
        <h2 className="absolute top-6 text-white text-3xl font-bold tracking-wide">
          Education
        </h2>
        <div className="flex flex-wrap-reverse justify-center items-center gap-6 p-6 max-w-5xl">
          {/* Dynamic EducationCards with spacing and responsiveness */}

        </div>
      </div>
    </>
  );
};

export default Education;
