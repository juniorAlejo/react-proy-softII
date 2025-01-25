import React from "react";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: string) => {
    if (role === "student") {
      navigate("/student");
    } else {
      navigate("/teacher");
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://radiotitanka.pe/content/img_noticia/091942_unamba.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center ">
          Repositorio de
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center  ">
          Docentes
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center  ">
          de
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center  ">
          Sistemas
        </h1>
        <div className="flex justify-center space-x-4 pt-3">
          <button
            onClick={() => handleRoleSelection("student")}
            className="px-6 py-3 bg-primary hover:bg-secondary_light text-white font-semibold rounded-2xl"
          >
            Estudiante
          </button>
          <button
            onClick={() => handleRoleSelection("teacher")}
            className="px-6 py-3 border border-white hover:border-l-white text-wborder-white font-semibold rounded-2xl"
          >
            Docente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
