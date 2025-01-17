import { PacmanLoader } from "react-spinners";


const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Hola!!</h1>
            <p className="text-lg text-gray-600">Esta página está en construcción. ¡Vuelve pronto!</p>
            <PacmanLoader className="m-4" color="yellow" />
        </div>
    );
};

export default Home;
