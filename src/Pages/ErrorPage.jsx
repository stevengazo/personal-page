const ErrorPage = () => {
  return (
    <>
      <div className="bg-red-500 h-screen w-screen flex flex-col justify-center items-center">
        <h3 className=" text-4xl text-white ">Error 404 🥲</h3>
     <p className="text-white italic font-extralight">El sitio que estabas buscando no existe</p>
      </div>
    </>
  );
};

export default ErrorPage;
