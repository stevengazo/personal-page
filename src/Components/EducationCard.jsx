const EducationCard = ({ title, school, description, dateStart, dateEnd }) => {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long", // Puedes cambiarlo a "short" para abreviar el mes
    }).format(date);
  };

  return (
    <div className="bg-slate-800 m-2  text-white p-4 rounded-md shadow-lg">
      {/* Contenedor principal */}
      <div className="flex flex-col gap-2">
        {/* Título */}
        <h5 className="text-md font-semibold">{title}</h5>

        {/* Detalles de la escuela y fechas */}
        <div className="flex flex-row gap-2 italic">
          <h6 className="text-sm">{school}</h6>
          <h6 className="text-sm">
            {formatDate(dateStart)} - {formatDate(dateEnd)}
          </h6>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default EducationCard;