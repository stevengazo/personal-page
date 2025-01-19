const EducationCard = () => {
  return (
    <>
      <div className="bg-slate-800 m-2 w-10/12 gap-2 text-white p-2 rounded-md">
        <div className="flex flex-col ">
          <h5 className=" text-md font-semibold">
            Técnico Medio en Informática en Soporte
          </h5>
          <div className="flex flex-row gap-2 italic">
            <h6 className=" text-sm">CTP Del Este</h6>
            <h6 className=" text-sm">Enero 2016 - Diciembre 2018</h6>
          </div>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          dictum nunc lacus, in luctus sapien scelerisque eu. Proin ac viverra
          urna. Donec venenatis tincidunt odio, vel ultricies quam cursus ut.
          Curabitur a mauris leo. In lorem nulla.
        </p>
      </div>
    </>
  );
};

export default EducationCard;
