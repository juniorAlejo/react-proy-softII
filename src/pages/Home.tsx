import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "./components/Hero";
import { TeacherDto } from "../types/Teacher";
import { getTeacher } from "../services/Teacher";

export const Home: React.FC = () => {
  const [docentes, setDocentes] = useState<TeacherDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  //---------------------------------------------------------------- GET TEACHERS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getTeacher();
        console.log(products);
        setDocentes(products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, []);

  const handleCardClick = (docente: TeacherDto) => {
    navigate(`/teacher/${docente.IdTeacher}`, { state: docente });
  };

  return (
    <>
      <Hero />
      <section className="py-4 bg-[#fff]">
        <div className="container mx-auto px-14">
          <h3 className="mb-12 text-center text-xl text-primary">
            Aquí encontrarás una amplia colección de recursos académicos y
            científicos desarrollados por nuestra comunidad universitaria. Este
            espacio está diseñado para promover el acceso abierto al
            conocimiento, resguardar la producción intelectual de estudiantes,
            docentes e investigadores, y fomentar el intercambio de ideas y
            saberes.
          </h3>

          {loading ? (
            <div className="text-center">Cargando docentes...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {docentes.map((docente) => (
                <div
                  key={docente.IdTeacher}
                  className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 cursor-pointer"
                  style={{ height: "350px" }}
                  onClick={() => handleCardClick(docente)}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={docente.Image}
                    alt={docente.FirstName}
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <h4 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                      {docente.FirstName} {docente.LastName}
                    </h4>
                    <p className="text-xl font-semibold text-gray-800">
                      {docente.Position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
