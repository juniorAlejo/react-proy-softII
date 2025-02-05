import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { TeacherDto } from "../../../types/Teacher";
import { getFormationsByTeacherId } from "../../../services/Teacher/Formation";
import { Formation } from "../../../types/Teacher/FormationAcademic";

export const TeacherDetail: React.FC = () => {
  const { state } = useLocation();
  const docente = state as TeacherDto;
  console.log(docente);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    fetchFormation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!docente) {
    return <div>No se encontraron datos para el docente con ID {id}</div>;
  }

  const [formations, setFormations] = useState<Formation[]>([]);
  //---------------------------------------------------------------- GER FORMATIONS
  const fetchFormation = async () => {
    try {
      const formation = await getFormationsByTeacherId(id);

      setFormations(formation);
    } catch (error) {
      console.error("Error al obtener la formacion:", error);
    }
  };

  return (
    <>
      <section className="sm:mt-14  px-4  max-w-6xl mx-auto pt-16 pb-4 flex flex-col sm:flex-row  gap-8">
        <div className="bg-[#F8F8F8] p-6 w-full sm:w-1/3 text-center flex flex-col items-center">
          <div className="w-40 h-40 bg-[#ffffff] rounded-md overflow-hidden flex items-center justify-center mb-4">
            <img
              src={docente.image}
              alt="Foto del Profesor"
              className="w-full h-full object-cover"
            />
          </div>
          <ul className="text-gray-700 space-y-2 text-left w-full">
            <li className="flex justify-between">
              <span className="font-bold">Género:</span>
              <span>{docente.gender ? "Masculino" : "Femenino"}</span>
            </li>

            <li className="flex justify-between">
              <span className="font-bold">Nacionalidad:</span>
              <span>Perú</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Renacyt:</span>
              <span>{docente.concytec}</span>
            </li>
          </ul>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={docente.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary_light text-xl cursor-pointer"
            >
              <FaFacebook />
            </a>

            <a
              href={`mailto:${docente.mail}`}
              className="text-secondary_light text-xl cursor-pointer"
            >
              <FaEnvelope />
            </a>

            <a
              href={docente.linkedIn}
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
            {docente.firstName} {docente.lastName}
          </h2>
          <p className="text-black leading-7 text-justify">
            {docente.description}
          </p>
        </div>

        <div className="fixed bottom-8 right-8 bg-black p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer">
          <span className="text-teal-400 font-bold text-xl">V</span>
        </div>
      </section>
      <section className="mt-8 px-4 max-w-6xl mx-auto mb-12">
        <div className="mb-8">
          <h3 className="text-secondary_light text-lg font-bold mb-4 text-center sm:text-left">
            FORMACION ACADEMICA
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border border-gray-300 p-2">Grado</th>
                <th className="border border-gray-300 p-2">Titulo</th>

                <th className="border border-gray-300 p-2">
                  Centro de estudios
                </th>
                <th className="border border-gray-300 p-2">Pais de estudios</th>
                <th className="border border-gray-300 p-2">Fuente</th>
              </tr>
            </thead>
            <tbody>
              {formations.map((form, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{form.degree}</td>
                  <td className="border border-gray-300 p-2">{form.title}</td>
                  <td className="border border-gray-300 p-2">
                    {form.studyCenter}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {form.countryOfStudy}
                  </td>
                  <td className="border border-gray-300 p-2">{form.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              {docente.workExperiences.map((work, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {work.companyName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {work.position}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {work.jobDescription}
                  </td>
                  <td className="border border-gray-300 p-2">{work.jobIdi}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(work.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {work.endDate
                      ? new Date(work.endDate).toLocaleDateString()
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
              {docente.teachingExperiences.map((teaching, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {teaching.institution}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.institutionType === "0" ||
                    teaching.institutionType === 0
                      ? "Pública"
                      : teaching.institutionType === "1" ||
                        teaching.institutionType === 1
                      ? "Privada"
                      : "Tipo Desconocido"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {teaching.teacherType == "0" || teaching.teacherType === 0
                      ? "Docente Titular"
                      : teaching.teacherType == "1" ||
                        teaching.teacherType === 1
                      ? "Docente Asociado"
                      : teaching.teacherType == "2" ||
                        teaching.teacherType === 2
                      ? "Docente Auxiliar"
                      : "Tipo Desconocido"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {teaching.jobDescription}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(teaching.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teaching.endDate
                      ? new Date(teaching.endDate).toLocaleDateString()
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
              {docente.thesisAdvisingExperiences.map((thesis, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {thesis.university}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {thesis.thesis}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {thesis.thesisStudent}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <a
                      href={thesis.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔍
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(thesis.thesisAcceptanceDate).toLocaleDateString()}
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
