import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Article } from "../../types/Teacher/Article";
import { validateForm } from "../../validation/validateFormArticle";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { createArticleDocente } from "../../services/Teacher/ScientificArticle";

const CreateArticle = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [data, setData] = useState<Article>({
    name: "",
    description: "",
    summary: "",
    date: "",
    doi: "",
    authors: "",
    pdf: "",
    estatus: 0,
    idNivel: 0,
    idTeacher: user.id,
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    description: "",
    summary: "",
    date: "",
    doi: "",
    authors: "",
    pdf: "",
    estatus: "",
    idNivel: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateForm({ ...data, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { tempErrors, isValid } = validateForm(data);
    setErrors(tempErrors);

    if (isValid) {
      try {
        console.log(data);
        const response = await createArticleDocente(data);

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
          setData({
            name: "",
            description: "",
            summary: "",
            date: "",
            doi: "",
            authors: "",
            pdf: "",
            estatus: 0,
            idNivel: 0,
          });
          setErrors({
            name: "",
            description: "",
            summary: "",
            date: "",
            doi: "",
            authors: "",
            pdf: "",
            estatus: "",
            idNivel: "",
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
      <Breadcrumb pageName="Crear artículo" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Titulo
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingrese el titulo"
                    className={`w-full rounded border-[1.5px] ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={data.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="row flex gap-4">
                  <div className="mb-4.5 w-3/5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Pdf
                    </label>
                    <input
                      type="url"
                      name="pdf"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errors.pdf
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.pdf}
                      onChange={handleInputChange}
                    />
                    {errors.pdf && (
                      <p className="text-red-500 text-sm mt-1">{errors.pdf}</p>
                    )}
                  </div>
                  <div className="mb-4.5 w-2/5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Doi
                    </label>
                    <input
                      type="text"
                      name="doi"
                      placeholder="DOI"
                      className={`w-full rounded border-[1.5px] ${
                        errors.doi
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.doi}
                      onChange={handleInputChange}
                    />
                    {errors.doi && (
                      <p className="text-red-500 text-sm mt-1">{errors.doi}</p>
                    )}
                  </div>
                </div>
                <div className="row flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tipo de artículo
                    </label>

                    <div className="relative z-20 bg-transparent dark:bg-form-input ">
                      <select
                        name="idNivel"
                        value={data.idNivel}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            idNivel: Number(e.target.value),
                          }));
                          setIsOptionSelected(true);
                        }}
                        className={`cursor-pointer ${
                          errors.idNivel
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          isOptionSelected ? "text-black dark:text-white" : ""
                        }`}
                      >
                        <option
                          value={0}
                          className="text-body dark:text-bodydark"
                        >
                          Revista
                        </option>
                        <option
                          value={1}
                          className="text-body dark:text-bodydark"
                        >
                          Procidis
                        </option>
                        <option
                          value={2}
                          className="text-body dark:text-bodydark"
                        >
                          Patentes
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Seleccione el año
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errors.date
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={data.date}
                        onChange={handleInputChange}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Autores
                  </label>
                  <textarea
                    rows={2}
                    name="authors"
                    placeholder="Ingrese los autores"
                    className={`w-full rounded border-[1.5px] ${
                      errors.authors
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={data.authors}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.authors && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.authors}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="w-full mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Estado
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input ">
                    <select
                      name="estatus"
                      value={data.estatus}
                      onChange={(e) => {
                        setData((prevData) => ({
                          ...prevData,
                          estatus: Number(e.target.value),
                        }));
                        setIsOptionSelected(true);
                      }}
                      className={`cursor-pointer ${
                        errors.estatus
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        isOptionSelected ? "text-black dark:text-white" : ""
                      }`}
                    >
                      <option
                        value={0}
                        className="text-body dark:text-bodydark"
                      >
                        En proceso
                      </option>
                      <option
                        value={1}
                        className="text-body dark:text-bodydark"
                      >
                        Terminado
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
                    Descripción
                  </label>
                  <textarea
                    rows={2}
                    name="description"
                    placeholder="Ingrese una pequeña descripcion"
                    className={`w-full rounded border-[1.5px] ${
                      errors.description
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={data.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Resumen
                  </label>
                  <textarea
                    rows={3}
                    name="summary"
                    placeholder="Ingrese una pequeña descripcion"
                    className={`w-full rounded border-[1.5px] ${
                      errors.summary
                        ? "border-red-500 dark:border-red-500"
                        : "border-stroke dark:border-form-strokedark"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={data.summary}
                    onChange={handleInputChange}
                  ></textarea>{" "}
                  {errors.summary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.summary}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Crear Artículo
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

export default CreateArticle;
