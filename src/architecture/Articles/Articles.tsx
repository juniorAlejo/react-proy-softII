import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Trash2, UserRoundPen } from "lucide-react";
import Modal from "../../pages/Modal";
import { Article } from "../../types/Teacher/Article";
import { validateForm } from "../../validation/validateFormArticle";
import { ToastContainer, Bounce, toast } from "react-toastify";
import {
  deleteArticleDocente,
  getScientificArticlesByTeacherId,
  updateArticleDocente,
} from "../../services/Teacher/ScientificArticle";
import ConfirmModal from "../../components/ModalConfirm/ConfirmModal";
import Loader from "../../common/Loader";

const Articles = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [articles, setArticles] = useState<Article[]>([]);

  const [filterStatus, setFilterStatus] = useState<number | null>(null);

  const filteredArticles =
    filterStatus !== null
      ? articles.filter((article) => article.estatus === filterStatus)
      : articles;

  //---------------------------------------------------------------- GET ALL

  const fetchArticleTeacher = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const fetchedTeacher = await getScientificArticlesByTeacherId(user.id);
      console.log(fetchedTeacher);
      setArticles(fetchedTeacher || []);
    } catch (error) {
      console.error("Error al obtener articulos:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleTeacher();
  }, [user?.id]);

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
    editor: "",
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
        const response = await updateArticleDocente(data);

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
        closeModal();
        fetchArticleTeacher();
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

  const handleEditClickarticle = (newData: Article) => {
    console.log(newData);
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await deleteArticleDocente(deleteId);
      if (response.success) {
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
        fetchArticleTeacher();
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
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Artículos" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filterStatus == 1 ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilterStatus(1)}
          >
            Publicados
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterStatus == 0 ? "bg-yellow-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilterStatus(0)}
          >
            En Proceso
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => setFilterStatus(null)}
          >
            Todos
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="y-4 px-1 font-medium text-black dark:text-white xl:pl-11">
                  Titulo
                </th>
                <th className="y-4 px-1 font-medium text-black dark:text-white xl:pl-11">
                  Descripcion
                </th>
                <th className="y-4 px-1 font-medium text-black dark:text-white xl:pl-11">
                  Resumen
                </th>
                <th className=" py-4 px-1 font-medium text-black dark:text-white">
                  Año
                </th>

                <th className=" py-4 px-1 font-medium text-black dark:text-white">
                  DOI
                </th>
                <th className=" py-4 px-1 font-medium text-black dark:text-white xl:pl-11">
                  Autores
                </th>
                <th className="py-4 px-1 font-medium text-black dark:text-white ">
                  Url
                </th>
                <th className="py-4 px-1 font-medium text-black dark:text-white xl:pl-11">
                  Estado
                </th>
                <th className=" py-4 px-1 font-medium text-black dark:text-white">
                  Tipo de articulo
                </th>
                <th className=" py-4 px-1 font-medium text-black dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-1 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {article.name.length > 5
                          ? article.name.slice(0, 5) + "..."
                          : article.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-1 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {article.description.length > 5
                          ? article.description.slice(0, 5) + "..."
                          : article.description}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-1 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {article.summary.length > 5
                          ? article.summary.slice(0, 5) + "..."
                          : article.summary}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {new Date(article.date).toLocaleDateString("es-ES")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {article.doi}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {article.authors.length > 5
                          ? article.authors.slice(0, 5) + "..."
                          : article.authors}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {article.pdf.length > 5
                          ? article.pdf.slice(0, 5) + "..."
                          : article.pdf}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          article.estatus === 0
                            ? "bg-yellow-500 text-yellow-700"
                            : "bg-green-500 text-green-700"
                        }`}
                      >
                        {article.estatus === 0 ? "En Proceso" : "Publicado"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {article.idNivel === 0
                          ? "Revista"
                          : article.idNivel === 1
                          ? "Procidis"
                          : article.idNivel === 2
                          ? "Patentes"
                          : "Desconocido"}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <UserRoundPen
                            onClick={() => handleEditClickarticle(article)}
                            className="text-primary dark:text-white"
                            size={21}
                          />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setShowModal(true);
                            setDeleteId(article.id);
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
                    colSpan={10}
                    className="py-5 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No hay artículos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data && (
          <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
            {data && (
              <div className="p-4 relative">
                <button
                  className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                  onClick={closeModal}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Editar Articulo
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row flex gap-4">
                    <div className="w-full mb-4.5">
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
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
                  </div>
                  <div className="row flex gap-4">
                    <div className="mb-4.5 w-2/6">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Url
                      </label>
                      <input
                        type="url"
                        name="pdf"
                        placeholder="Ingrese el enlace del pdf"
                        className={`w-full rounded border-[1.5px] ${
                          errors.pdf
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={data.pdf}
                        onChange={handleInputChange}
                      />
                      {errors.pdf && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pdf}
                        </p>
                      )}
                    </div>
                    <div className="mb-4.5 w-2/6">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Doi
                      </label>
                      <input
                        type="number"
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.doi}
                        </p>
                      )}
                    </div>
                    <div className="row flex gap-4 w-2/6">
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
                              isOptionSelected
                                ? "text-black dark:text-white"
                                : ""
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
                              Proceedings
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
                    </div>
                  </div>
                  <div className="row flex gap-4">
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
                    <div className="w-full mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Autores
                      </label>
                      <textarea
                        rows={1}
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
                  <div className="row flex gap-4">
                    <div className="w-full mb-6">
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
                    <div className="w-full mb-6">
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
              </div>
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

export default Articles;
