import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import caratula from "../../../assets/img/caratula.png";
import { ResearchProjectDto } from "../../../types/ResearchProject";
import { formatDateComplete } from "../../../utils/util";

export const ResearchProjectDetail: React.FC = () => {
  const { state } = useLocation();
  const project = state as ResearchProjectDto;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!project) {
    return <div>No se encontraron datos para el project con ID {id}</div>;
  }
  return (
    <section className="mt-[130px] sm:mt-12 max-w-[1000px] mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Efectos de la ceniza de cascara de arroz sobre las propiedades mecánicas
        y durabilidad de un concreto convencional, Lambayeque-2024
      </h1>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col items-center lg:items-start w-full lg:w-1/4">
            <div className="w-62 h-70  flex items-center justify-center rounded-md mb-4 border-2 border-gray-400">
              <img
                src={caratula}
                alt="Default Thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto max-w-34 flex items-center mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Descargar PDF
            </a>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-bold">Fecha:</span> <p>{formatDateComplete(project.date)}</p>
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Autor(es):</span>
                <p className="text-primary">{project.authors}</p>
              </p>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-gray-400">Resumen:</p>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm text-justify">
              {project.summary}
            </p>
            <div className="space-y-4 text-sm">
              <p className="text-gray-600 mb-4">
                <p className="font-bold">URI:</p>
                <a
                  href={project.doi}
                  className="text-secondary_light underline"
                >
                  {project.doi}
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Cómo citar:</span>
                <p>
                  Observatorio Tecnológico. (2024, diciembre). Boletín del
                  Observatorio Tecnológico, año 2 (4). Carrera de Ingeniería de
                  Sistemas. Universidad de Lima. {project.doi}
                </p>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Editor:</span>
                <p>{project.editor}</p>
              </p>

              <p className="text-gray-600 mb-4">
                <span className="font-bold">Temas:</span>
                <br />
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Inteligencia artificial
                </a>
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Educación superior
                </a>
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Tecnología educativa
                </a>
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Artificial intelligence
                </a>
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Higher education
                </a>
                <a
                  href="#"
                  className="text-secondary_light block hover:underline"
                >
                  Educational Technology
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Colección(es):</span>
                <p> Boletín del Observatorio Tecnológico ULima [8]</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
