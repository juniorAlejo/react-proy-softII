import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {
  validateFormLaboral,
  validateFormLaboralDocente,
  validateFormTesis,
} from "../../validation/validateFormExperience";

import { ToastContainer, Bounce, toast } from "react-toastify";
import {
  ExperienceLaboral,
  ExperienceLaboralDocente,
  ExperienceTesis,
} from "../../types/Teacher/Experience";
import {
  createExperienceLaboral,
  createExperienceLaboralDocente,
  createExperienceTesis,
} from "../../services/Teacher/Experience";

const CreateExperience = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

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

  const [dataLaboralDocente, setDataLaboralDocente] =
    useState<ExperienceLaboralDocente>({
      institution: "",
      institutionType: "0",
      teacherType: "0",
      jobDescription: "",
      startDate: "",
      endDate: "",
      teacherId: user.id,
    });

  const [errorsLaboralDocente, setErrorsLaboralDocente] = useState<
    Record<string, string>
  >({
    institution: "",
    institutionType: "0",
    teacherType: "0",
    jobDescription: "",
    startDate: "",
    endDate: "",
  });

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
        const response = await createExperienceLaboral(dataLaboral);

        if (response.success) {
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
        const response = await createExperienceLaboralDocente(
          dataLaboralDocente
        );

        if (response.success) {
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
          setDataLaboralDocente({
            institution: "",
            institutionType: "0",
            teacherType: "0",
            jobDescription: "",
            startDate: "",
            endDate: "",
          });
          setErrorsLaboralDocente({
            institution: "",
            institutionType: "0",
            teacherType: "0",
            jobDescription: "",
            startDate: "",
            endDate: "",
          });
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
        const response = await createExperienceTesis(dataTesis);

        if (response.success) {
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

  return (
    <>
      <Breadcrumb pageName="Agregar Experiencia" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-center text-black dark:text-white">
                LABORAL
              </h3>
            </div>
            <form onSubmit={handleSubmitLaboral}>
              <div className="p-6.5">

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

                <div className="mb-4.5">
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

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Cargo en I+d+i<span className="text-gray-400"> (Opcional)</span>
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

                <div className="mb-4.5">
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
                      value={dataLaboral.startDate}
                      onChange={handleInputChangeLaboral}
                    />
                    {errorsLaboral.startDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboral.startDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
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
                      value={dataLaboral.endDate}
                      onChange={handleInputChangeLaboral}
                    />
                    {errorsLaboral.endDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboral.endDate}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-center text-black dark:text-white">
                LABORAL COMO DOCENTE
              </h3>
            </div>
            <form onSubmit={handleSubmitLaboralDocente}>
              <div className="p-6.5">
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
                        Docente Auxiliar
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

                <div className="mb-4.5">
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
                      value={dataLaboralDocente.startDate}
                      onChange={handleInputChangeLaboralDocente}
                    />
                    {errorsLaboralDocente.startDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboralDocente.startDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
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
                      value={dataLaboralDocente.endDate}
                      onChange={handleInputChangeLaboralDocente}
                    />
                    {errorsLaboralDocente.endDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsLaboralDocente.endDate}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-center text-black dark:text-white">
                ASESOR DE TESIS
              </h3>
            </div>
            <form onSubmit={handleSubmitTesis}>
              <div className="p-6.5">
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
                </div>

                <div className="mb-4.5">
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
                      value={dataTesis.thesisAcceptanceDate}
                      onChange={handleInputChangeTesis}
                    />
                    {errorsTesis.thesisAcceptanceDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsTesis.thesisAcceptanceDate}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
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
      </div>
    </>
  );
};

export default CreateExperience;
