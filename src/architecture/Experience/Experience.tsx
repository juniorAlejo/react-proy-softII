import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { getTeacherById } from "../../services/Teacher/Teacher";
import {
  ExperienceTeacher,
  ExperienceThesisAdvisor,
  TeacherDto,
  WorkExperience,
} from "../../types/Teacher";
import { Trash2, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import Modal from "../../pages/Modal";
const Experience = () => {
  const [docente, setDocente] = useState<TeacherDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const [asesorTesis, setAsesorTesis] =
    useState<ExperienceThesisAdvisor | null>(null);
  const [laboralDocente, setLaboralDocente] =
    useState<ExperienceTeacher | null>(null);
  const [laboral, setLaboral] = useState<WorkExperience | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const fetchedTeacher = await getTeacherById(1);
        setDocente(fetchedTeacher);
      } catch (error) {
        console.error("Error al obtener el docente:", error);
      }
    };
    fetchTeacher();
  }, [1]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  const handleEditClickAsesor = (data: ExperienceThesisAdvisor) => {
    setAsesorTesis(data);
    setIsModalOpen(true);
  };

  const handleEditClickLaboralDocente = (data: ExperienceTeacher) => {
    setLaboralDocente(data);
    setIsModalOpen2(true);
  };
  const handleEditClickLaboral = (data: WorkExperience) => {
    setLaboral(data);
    setIsModalOpen3(true);
  };
  if (!docente) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Experiencia" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Experiencia Laboral
          </h4>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Institución
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Cargo
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Descripción del cargo
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Cargo en I+D+I
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Inicio
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Fin
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {docente.workExperiences.map((work, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {work.companyName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {work.position}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {work.jobDescription}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">{work.jobIdi}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(work.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {work.endDate
                        ? new Date(work.endDate).toLocaleDateString()
                        : "A la actualidad"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <UserRoundPen
                          onClick={() => handleEditClickLaboral(work)}
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                      <button className="hover:text-primary">
                        <Trash2
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {laboral && (
          <Modal isOpen={isModalOpen3} onClose={closeModal3} size="lg">
            {laboral && (
              <div className="p-4 relative">
                <button
                     className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal3}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Experiencia Laboral
                </h3>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Institución
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboral.companyName || ""}
                    onChange={(e) =>
                      setLaboral((prev: any) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Descripción del cargo
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboral.jobDescription || ""}
                    onChange={(e) =>
                      setLaboral((prev: any) => ({
                        ...prev,
                        jobDescription: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div className="mb-4 w-2/5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Cargo en I+D+I
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={laboral.jobIdi || ""}
                      onChange={(e) =>
                        setLaboral((prev: any) => ({
                          ...prev,
                          jobIdi: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mb-4 w-3/5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Cargo
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={laboral.position || ""}
                      onChange={(e) =>
                        setLaboral((prev: any) => ({
                          ...prev,
                          position: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mb-4 w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={laboral.startDate || ""}
                        onChange={(e) =>
                          setLaboral((prev: any) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center  bg-white shadow-default  dark:bg-form-input  my-4 z-10">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={laboral.endDate || ""}
                        onChange={(e) =>
                          setLaboral((prev: any) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center  bg-white shadow-default  dark:bg-form-input  my-4 z-10">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                      closeModal3();
                    }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Experiencia Laboral como Docente
          </h4>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Institución
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Tipo Institución
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Tipo Docente
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Descripción del cargo
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Inicio
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Fin
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {docente.teachingExperiences.map((teaching, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {teaching.institution}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {teaching.institutionType}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {teaching.teacherType}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {teaching.jobDescription}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(teaching.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {teaching.endDate
                        ? new Date(teaching.endDate).toLocaleDateString()
                        : "A la actualidad"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <UserRoundPen
                          onClick={() =>
                            handleEditClickLaboralDocente(teaching)
                          }
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                      <button className="hover:text-primary">
                        <Trash2
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {laboralDocente && (
          <Modal isOpen={isModalOpen2} onClose={closeModal2} size="lg">
            {laboralDocente && (
              <div className="p-4 relative">
                <button
                     className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal2}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Experiencia Laboral como Docente
                </h3>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Institución
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboralDocente.institution || ""}
                    onChange={(e) =>
                      setLaboralDocente((prev: any) => ({
                        ...prev,
                        institution: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tipo Institución
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboralDocente.teacherType || ""}
                    onChange={(e) =>
                      setLaboralDocente((prev: any) => ({
                        ...prev,
                        teacherType: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tipo Docente
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboralDocente.institutionType || ""}
                    onChange={(e) =>
                      setLaboralDocente((prev: any) => ({
                        ...prev,
                        institutionType: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Descripción del cargo
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={laboralDocente.jobDescription || ""}
                    onChange={(e) =>
                      setLaboralDocente((prev: any) => ({
                        ...prev,
                        jobDescription: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div className="mb-4 w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={laboralDocente.startDate || ""}
                        onChange={(e) =>
                          setLaboralDocente((prev: any) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center  bg-white shadow-default  dark:bg-form-input  my-4 z-10">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={laboralDocente.endDate || ""}
                        onChange={(e) =>
                          setLaboralDocente((prev: any) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center  bg-white shadow-default  dark:bg-form-input  my-4 z-10">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                      closeModal2();
                    }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Experiencia como asesor de tesis
          </h4>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Universidad
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Tesis
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Tesista(s)
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Repositorio
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Aceptación de Tesis
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {docente.thesisAdvisingExperiences.map((thesis, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {thesis.university}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {thesis.thesis}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {thesis.thesisStudent}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {thesis.repository}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(
                        thesis.thesisAcceptanceDate
                      ).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEditClickAsesor(thesis)}
                        className="hover:text-primary"
                      >
                        <UserRoundPen
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                      <button className="hover:text-primary">
                        <Trash2
                          className="text-primary dark:text-white"
                          size={21}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {asesorTesis && (
          <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
            {asesorTesis && (
              <div className="p-4 relative">
                <button
                     className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Experiencia como asesor de tesis
                </h3>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Universidad
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={asesorTesis.university || ""}
                    onChange={(e) =>
                      setAsesorTesis((prev: any) => ({
                        ...prev,
                        university: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tesis
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={asesorTesis.thesis || ""}
                    onChange={(e) =>
                      setAsesorTesis((prev: any) => ({
                        ...prev,
                        thesis: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tesista(s)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={asesorTesis.thesisStudent || ""}
                    onChange={(e) =>
                      setAsesorTesis((prev: any) => ({
                        ...prev,
                        thesisStudent: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Repositorio
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={asesorTesis.repository || ""}
                    onChange={(e) =>
                      setAsesorTesis((prev: any) => ({
                        ...prev,
                        repository: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fecha Aceptación de Tesis
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={asesorTesis.thesisAcceptanceDate || ""}
                      onChange={(e) =>
                        setAsesorTesis((prev: any) => ({
                          ...prev,
                          thesisAcceptanceDate: e.target.value,
                        }))
                      }
                    />
                    <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center  bg-white shadow-default  dark:bg-form-input  my-4 z-10">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                          fill="#64748B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Experience;
