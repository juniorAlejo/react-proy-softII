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
import {
  validateFormLaboral,
  validateFormLaboralDocente,
  validateFormTesis,
} from "../../validation/validateFormExperience";
import {
  deleteExperienceLaboral,
  deleteExperienceLaboralDocente,
  deleteExperienceTesis,
  updateExperienceLaboral,
  updateExperienceLaboralDocente,
  updateExperienceTesis,
} from "../../services/Teacher/Experience";
import { ToastContainer, Bounce, toast } from "react-toastify";
import {
  ExperienceLaboral,
  ExperienceLaboralDocente,
  ExperienceTesis,
} from "../../types/Teacher/Experience";
import ConfirmModal from "../../components/ModalConfirm/ConfirmModal";

const Experience = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [caseType, setCaseType] = useState<"docente" | "laboral" | "tesis">();

  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [docente, setDocente] = useState<TeacherDto | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  //---------------------------------------------------------------- LABORAL
  const [dataLaboral, setDataLaboral] = useState<ExperienceLaboral>({
    companyName: "",
    position: "",
    jobDescription: "",
    jobIdi: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    teacherId: user.id,
  });

  const [errorsLaboral, setErrorsLaboral] = useState<Record<string, string>>({
    companyName: "",
    position: "",
    jobDescription: "",
    jobIdi: "",
    startDate: "",
    endDate: "",
    isCurrent: "",
  });

  //---------------------------------------------------------------- LABORAL DOCENTE
  const [dataLaboralDocente, setDataLaboralDocente] =
    useState<ExperienceLaboralDocente>({
      institution: "",
      institutionType: 0,
      teacherType: 0,
      jobDescription: "",
      startDate: "",
      endDate: "",
      teacherId: user.id,
    });

  const [errorsLaboralDocente, setErrorsLaboralDocente] = useState<
    Record<string, string>
  >({
    institution: "",
    institutionType: "",
    teacherType: "",
    jobDescription: "",
    startDate: "",
    endDate: "",
  });

  //---------------------------------------------------------------- TESIS
  const [dataTesis, setDataTesis] = useState<ExperienceTesis>({
    university: "",
    thesis: "",
    thesisStudent: "",
    repository: "",
    thesisAcceptanceDate: "",
    teacherId: user.id,
  });

  const [errorsTesis, setErrorsTesis] = useState<Record<string, string>>({
    university: "",
    thesis: "",
    thesisStudent: "",
    repository: "",
    thesisAcceptanceDate: "",
  });

  //---------------------------------------------------------------- GET ALL
  const fetchTeacher = async () => {
    try {
      console.log(user.id);
      const fetchedTeacher = await getTeacherById(user.id);
      setDocente(fetchedTeacher);
    } catch (error) {
      console.error("Error al obtener el docente:", error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [user.id]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleEditClickLaboral = (data: WorkExperience) => {
    setDataLaboral(data);
    setIsModalOpen(true);
  };

  const handleEditClickLaboralDocente = (data: ExperienceTeacher) => {
    setDataLaboralDocente(data);
    setIsModalOpen2(true);
  };

  const handleEditClickAsesor = (data: ExperienceThesisAdvisor) => {
    setDataTesis(data);
    setIsModalOpen3(true);
  };

  //---------------------------------------------------------------- LABORAL
  const handleInputChangeLaboral = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDataLaboral((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateFormLaboral({
      ...dataLaboral,
      [name]: value,
    });

    setErrorsLaboral((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSubmitLaboral = async (e: React.FormEvent) => {
    e.preventDefault();

    const { tempErrors, isValid } = validateFormLaboral(dataLaboral);
    setErrorsLaboral(tempErrors);

    if (isValid) {
      try {
        console.log(dataLaboral);
        const response = await updateExperienceLaboral(dataLaboral);

        if (response.success) {
          toast.info(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setDataLaboral({
            companyName: "",
            position: "",
            jobDescription: "",
            jobIdi: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
          });
          setErrorsLaboral({
            companyName: "",
            position: "",
            jobDescription: "",
            jobIdi: "",
            startDate: "",
            endDate: "",
            isCurrent: "",
          });
          fetchTeacher();
          closeModal();
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("Opps, Algo salio mal!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  //---------------------------------------------------------------- LABORAL DOCENTE
  const handleInputChangeLaboralDocente = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDataLaboralDocente((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateFormLaboralDocente({
      ...dataLaboralDocente,
      [name]: value,
    });

    setErrorsLaboralDocente((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSubmitLaboralDocente = async (e: React.FormEvent) => {
    e.preventDefault();

    const { tempErrors, isValid } =
      validateFormLaboralDocente(dataLaboralDocente);
    setErrorsLaboralDocente(tempErrors);

    if (isValid) {
      try {
        console.log(dataLaboralDocente);
        const response = await updateExperienceLaboralDocente(
          dataLaboralDocente
        );

        if (response.success) {
          toast.info(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setDataLaboralDocente({
            institution: "",
            institutionType: 0,
            teacherType: 0,
            jobDescription: "",
            startDate: "",
            endDate: "",
          });
          setErrorsLaboralDocente({
            institution: "",
            institutionType: "",
            teacherType: "",
            jobDescription: "",
            startDate: "",
            endDate: "",
          });
          fetchTeacher();
          closeModal2();
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("Opps, Algo salio mal!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  //---------------------------------------------------------------- TESIS
  const handleInputChangeTesis = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDataTesis((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateFormTesis({
      ...dataTesis,
      [name]: value,
    });

    setErrorsTesis((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSubmitTesis = async (e: React.FormEvent) => {
    e.preventDefault();

    const { tempErrors, isValid } = validateFormTesis(dataTesis);
    setErrorsTesis(tempErrors);

    if (isValid) {
      try {
        console.log(dataTesis);
        const response = await updateExperienceTesis(dataTesis);

        if (response.success) {
          toast.info(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setDataTesis({
            university: "",
            thesis: "",
            thesisStudent: "",
            repository: "",
            thesisAcceptanceDate: "",
          });
          setErrorsTesis({
            university: "",
            thesis: "",
            thesisStudent: "",
            repository: "",
            thesisAcceptanceDate: "",
          });
          fetchTeacher();
          closeModal3();
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("Opps, Algo salio mal!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  //---------------------------------------------------------------- DELETE - EXPERIENCE
  const handleConfirmDelete = async () => {
    console.log("Confirmando eliminación de ID:", deleteId);
    if (!deleteId) return;

    try {
      let response;
      if (caseType === "docente") {
        response = await deleteExperienceLaboralDocente(deleteId);
      } else if (caseType === "laboral") {
        response = await deleteExperienceLaboral(deleteId);
      } else if (caseType === "tesis") {
        response = await deleteExperienceTesis(deleteId);
      }

      if (response && response.success) {
        setShowModal(false);
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchTeacher();
      } else {
        toast.error(response && response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Opps, Algo salió mal!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
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
              {docente.workExperiences.length > 0 ? (
                docente.workExperiences.map((work, index) => (
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
                      <p className="text-black dark:text-white">
                        {work.jobIdi}
                      </p>
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
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setDeleteId(work.id);
                            setCaseType("laboral");
                            setShowModal(true);
                          }}
                        >
                          <Trash2
                            className="text-primary dark:text-white"
                            size={21}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-5 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Sin experiencias laborales registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataLaboral && (
          <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
            {dataLaboral && (
              <form onSubmit={handleSubmitLaboral} className="p-4 relative">
                <button
                  className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Experiencia Laboral
                </h3>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Institución
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Ingrese el titulo"
                    className={`w-full rounded border-[1.5px] ${
                      errorsLaboral.companyName
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataLaboral.companyName}
                    onChange={handleInputChangeLaboral}
                  />
                  {errorsLaboral.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsLaboral.companyName}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Descripción del cargo
                  </label>
                  <textarea
                    rows={2}
                    name="jobDescription"
                    placeholder="Ingrese una pequeña descripcion"
                    className={`w-full rounded border-[1.5px] ${
                      errorsLaboral.jobDescription
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataLaboral.jobDescription}
                    onChange={handleInputChangeLaboral}
                  ></textarea>
                  {errorsLaboral.jobDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsLaboral.jobDescription}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cargo en I+d+i
                    </label>
                    <input
                      type="text"
                      name="jobIdi"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errorsLaboral.jobIdi
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={dataLaboral.jobIdi}
                      onChange={handleInputChangeLaboral}
                    />
                    {errorsLaboral.jobIdi && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboral.jobIdi}
                      </p>
                    )}
                  </div>

                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cargo
                    </label>
                    <input
                      type="text"
                      name="position"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errorsLaboral.position
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={dataLaboral.position}
                      onChange={handleInputChangeLaboral}
                    />
                    {errorsLaboral.position && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboral.position}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full  mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha de inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errorsLaboral.startDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          dataLaboral.startDate
                            ? dataLaboral.startDate.split("T")[0]
                            : ""
                        }
                        onChange={handleInputChangeLaboral}
                      />
                      {errorsLaboral.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsLaboral.startDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Fin
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errorsLaboral.endDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          dataLaboral.endDate
                            ? dataLaboral.endDate.split("T")[0]
                            : ""
                        }
                        onChange={handleInputChangeLaboral}
                      />
                      {errorsLaboral.endDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsLaboral.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
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
              {docente.teachingExperiences.length > 0 ? (
                docente.teachingExperiences.map((teaching, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {teaching.institution}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {teaching.institutionType === "0" ||
                        teaching.institutionType === 0
                          ? "Pública"
                          : teaching.institutionType === "1" ||
                            teaching.institutionType === 1
                          ? "Privada"
                          : "Tipo Desconocido"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setDeleteId(teaching.id);
                            setCaseType("docente");
                            setShowModal(true);
                          }}
                        >
                          <Trash2
                            className="text-primary dark:text-white"
                            size={21}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-5 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Sin experiencias laborales como docente registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataLaboralDocente && (
          <Modal isOpen={isModalOpen2} onClose={closeModal2} size="lg">
            {dataLaboralDocente && (
              <form
                onSubmit={handleSubmitLaboralDocente}
                className="p-4 relative"
              >
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
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Institución
                  </label>
                  <input
                    type="text"
                    name="institution"
                    placeholder="Ingrese el titulo"
                    className={`w-full rounded border-[1.5px] ${
                      errorsLaboralDocente.institution
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataLaboralDocente.institution}
                    onChange={handleInputChangeLaboralDocente}
                  />
                  {errorsLaboralDocente.institution && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsLaboralDocente.institution}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tipo de Institucion
                    </label>

                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={dataLaboralDocente.institutionType}
                        name="institutionType"
                        onChange={handleInputChangeLaboralDocente}
                        className={`cursor-pointer 
              
                                relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:focus:border-primary dark:text-white`}
                      >
                        <option
                          value={0}
                          className="text-body dark:text-bodydark"
                        >
                          Pública
                        </option>
                        <option
                          value={1}
                          className="text-body dark:text-bodydark"
                        >
                          Privada
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    {errorsLaboralDocente.institution && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboralDocente.institution}
                      </p>
                    )}
                  </div>
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tipo de Docente
                    </label>

                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={dataLaboralDocente.teacherType}
                        name="teacherType"
                        onChange={handleInputChangeLaboralDocente}
                        className={`cursor-pointer 
                             
                                relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:focus:border-primary dark:text-white`}
                      >
                        <option
                          value={0}
                          className="text-body dark:text-bodydark"
                        >
                          Docente Titular
                        </option>
                        <option
                          value={1}
                          className="text-body dark:text-bodydark"
                        >
                          Docente Asociado
                        </option>
                        <option
                          value={2}
                          className="text-body dark:text-bodydark"
                        >
                          Docente Escolar
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    {errorsLaboralDocente.institution && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboralDocente.institution}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Descripción del cargo
                  </label>
                  <textarea
                    rows={2}
                    name="jobDescription"
                    placeholder="Ingrese una  descripcion"
                    className={`w-full rounded border-[1.5px] ${
                      errorsLaboralDocente.jobDescription
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataLaboralDocente.jobDescription}
                    onChange={handleInputChangeLaboralDocente}
                  ></textarea>
                  {errorsLaboralDocente.jobDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsLaboralDocente.jobDescription}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha de inicio
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errorsLaboralDocente.startDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          dataLaboralDocente.startDate
                            ? dataLaboralDocente.startDate.split("T")[0]
                            : ""
                        }
                        onChange={handleInputChangeLaboralDocente}
                      />
                      {errorsLaboralDocente.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsLaboralDocente.startDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha Fin
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errorsLaboralDocente.endDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          dataLaboralDocente.endDate
                            ? dataLaboralDocente.endDate.split("T")[0]
                            : ""
                        }
                        onChange={handleInputChangeLaboralDocente}
                      />
                      {errorsLaboralDocente.endDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsLaboralDocente.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
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
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Repositorio
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Fecha Aceptación de Tesis
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {docente.thesisAdvisingExperiences.length > 0 ? (
                docente.thesisAdvisingExperiences.map((thesis, index) => (
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
                        <button className="hover:text-primary">
                          <UserRoundPen
                            onClick={() => handleEditClickAsesor(thesis)}
                            className="text-primary dark:text-white"
                            size={21}
                          />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setDeleteId(thesis.id);
                            setCaseType("tesis");
                            setShowModal(true);
                          }}
                        >
                          <Trash2
                            className="text-primary dark:text-white"
                            size={21}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-5 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Sin experiencias de tesis
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataTesis && (
          <Modal isOpen={isModalOpen3} onClose={closeModal3} size="lg">
            {dataTesis && (
              <form onSubmit={handleSubmitTesis} className="p-4 relative">
                <button
                  className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal3}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Experiencia como asesor de tesis
                </h3>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Universidad
                  </label>
                  <input
                    type="text"
                    name="university"
                    placeholder="Ingrese el titulo"
                    className={`w-full rounded border-[1.5px] ${
                      errorsTesis.university
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataTesis.university}
                    onChange={handleInputChangeTesis}
                  />
                  {errorsTesis.university && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsTesis.university}
                    </p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tesis
                  </label>
                  <input
                    type="text"
                    name="thesis"
                    placeholder="Ingrese el enlace"
                    className={`w-full rounded border-[1.5px] ${
                      errorsTesis.thesis
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataTesis.thesis}
                    onChange={handleInputChangeTesis}
                  />
                  {errorsTesis.thesis && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsTesis.thesis}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tesista(s)
                  </label>
                  <textarea
                    rows={2}
                    name="thesisStudent"
                    placeholder="Ingrese una pequeña descripcion"
                    className={`w-full rounded border-[1.5px] ${
                      errorsTesis.thesisStudent
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={dataTesis.thesisStudent}
                    onChange={handleInputChangeTesis}
                  ></textarea>
                  {errorsTesis.thesisStudent && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsTesis.thesisStudent}
                    </p>
                  )}
                </div>{" "}
                <div className="flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Repositorio
                    </label>
                    <input
                      type="url"
                      name="repository"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errorsTesis.repository
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={dataTesis.repository}
                      onChange={handleInputChangeTesis}
                    />
                    {errorsTesis.repository && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsTesis.repository}
                      </p>
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha de aceptacion
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="thesisAcceptanceDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errorsTesis.thesisAcceptanceDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          dataTesis.thesisAcceptanceDate
                            ? dataTesis.thesisAcceptanceDate.split("T")[0]
                            : ""
                        }
                        onChange={handleInputChangeTesis}
                      />
                      {errorsTesis.thesisAcceptanceDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsTesis.thesisAcceptanceDate}
                        </p>
                      )}
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
              </form>
            )}
          </Modal>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={" z-9999"}
        transition={Bounce}
      />
      <ConfirmModal
        isOpen={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Experience;
