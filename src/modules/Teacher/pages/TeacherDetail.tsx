import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { TeacherDto } from "../../../types/Teacher";

export const TeacherDetail: React.FC = () => {
  const { state } = useLocation();
  const docente = state as TeacherDto;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!docente) {
    return <div>No se encontraron datos para el docente con ID {id}</div>;
  }
  return (
    <>
      <section className="sm:mt-14  px-4  max-w-6xl mx-auto pt-16 pb-4 flex flex-col sm:flex-row  gap-8">
        <div className="bg-[#F8F8F8] p-6 w-full sm:w-1/3 text-center flex flex-col items-center">
          <div className="w-40 h-40 bg-[#ffffff] rounded-md overflow-hidden flex items-center justify-center mb-4">
            <img
              src={docente.Image}
              alt="Foto del Profesor"
              className="w-full h-full object-cover"
            />
          </div>
          <ul className="text-gray-700 space-y-2 text-left w-full">
            <li className="flex justify-between">
              <span className="font-bold">Género:</span>
              <span>{docente.Gender ? "Masculino" : "Femenino"}</span>
            </li>

            <li className="flex justify-between">
              <span className="font-bold">Nacionalidad:</span>
              <span>Perú</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Código de Registro:</span>
              <span>{docente.RegistrationCode}</span>
            </li>
          </ul>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={docente.Facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary_light text-xl cursor-pointer"
            >
              <FaFacebook />
            </a>

            <a
              href={`mailto:${docente.Mail}`}
              className="text-secondary_light text-xl cursor-pointer"
            >
              <FaEnvelope />
            </a>

            <a
              href={docente.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary_light text-xl cursor-pointer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="bg-[#F8F8F8] p-6  w-full sm:w-2/3">
          <h2 className="text-secondary_light text-xl font-bold mb-4 uppercase">
            {docente.FirstName} {docente.LastName}
          </h2>
          <p className="text-black leading-7 text-justify">
            {docente.Description}
          </p>
        </div>

        <div className="fixed bottom-8 right-8 bg-black p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer">
          <span className="text-teal-400 font-bold text-xl">V</span>
        </div>
      </section>
      <section className="mt-8 px-4 max-w-6xl mx-auto mb-12">
        <div className="mb-8">
          <h3 className="text-secondary_light text-lg font-bold mb-4 text-center sm:text-left">
            EXPERIENCIA LABORAL
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border border-gray-300 p-2">Institución</th>
                <th className="border border-gray-300 p-2">Cargo</th>
                <th className="border border-gray-300 p-2">
                  Descripción del cargo
                </th>
                <th className="border border-gray-300 p-2">Cargo en I+D+I</th>
                <th className="border border-gray-300 p-2">Fecha Inicio</th>
                <th className="border border-gray-300 p-2">Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              {docente.WorkExperiences.map((work, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {work.Institution}
                  </td>
                  <td className="border border-gray-300 p-2">{work.Job}</td>
                  <td className="border border-gray-300 p-2">
                    {work.JobDescription}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {work.JobIDI || "---"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(work.StartDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {work.EndDate
                      ? new Date(work.EndDate).toLocaleDateString()
                      : "A la actualidad"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <h3 className="text-secondary_light text-lg font-bold mb-4 text-center sm:text-left">
            EXPERIENCIA LABORAL COMO DOCENTE
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border border-gray-300 p-2">Institución</th>
                <th className="border border-gray-300 p-2">Tipo Institución</th>
                <th className="border border-gray-300 p-2">Tipo Docente</th>
                <th className="border border-gray-300 p-2">
                  Descripción del cargo
                </th>
                <th className="border border-gray-300 p-2">Fecha Inicio</th>
                <th className="border border-gray-300 p-2">Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              {docente.TeachingExperiences.map((teaching, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {teaching.Institution}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.InstitutionType}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.TeacherType}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.JobDescription}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(teaching.StartDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.EndDate
                      ? new Date(teaching.EndDate).toLocaleDateString()
                      : "A la actualidad"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-secondary_light text-lg font-bold mb-4 text-center sm:text-left">
            EXPERIENCIA COMO ASESOR DE TESIS
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border border-gray-300 p-2">Universidad</th>
                <th className="border border-gray-300 p-2">Tesis</th>
                <th className="border border-gray-300 p-2">Tesista(s)</th>
                <th className="border border-gray-300 p-2">Repositorio</th>
                <th className="border border-gray-300 p-2">
                  Fecha Aceptación de Tesis
                </th>
              </tr>
            </thead>
            <tbody>
              {docente.ThesisAdvisingExperiences.map((thesis, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {thesis.University}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {thesis.Thesis}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {thesis.ThesisStudent}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <a
                      href={thesis.Repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔍
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(thesis.ThesisAcceptanceDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
