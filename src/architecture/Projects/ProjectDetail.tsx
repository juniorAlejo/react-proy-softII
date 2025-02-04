import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectFormData } from "../../types/Teacher/Project";
import {
  deleteResearchProject,
  getProjectGetById,
  updateResearchProject,
} from "../../services/Teacher/ResearchProject";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";
import { validateFormUpdate } from "../../validation/validateFormProject";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Modal from "../../pages/Modal";
import FileUpload from "./File/FileUpload";
import ConfirmModal from "../../components/ModalConfirm/ConfirmModal";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Edit, Trash } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [project, setProject] = useState<any | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProject = async () => {
    try {
      if (id) {
        const data = await getProjectGetById(id);
        const mappedData = {
          id: data.id,
          title: data.name,
          authors: data.authors,
          description: data.description,
          summary: data.summary,
          year: data.date,
          file: null,
        };

        setProject(data);
        setFormData(mappedData);
      }
    } catch (error) {
      console.error("Error al obtener detalles del proyecto:", error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [id]);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    authors: "",
    description: "",
    summary: "",
    year: "",
    file: null,
    idTeacher: user.id,
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    title: "",
    authors: "",
    description: "",
    summary: "",
    year: "",
    file: "",
  });

  const handleFileUpload = (file: File) => {
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      file: "",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateFormUpdate({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { tempErrors, isValid } = validateFormUpdate(formData);
    setErrors(tempErrors);

    if (isValid) {
      try {
        console.log(formData);
        const response = await updateResearchProject(formData);
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
          setFormData({
            title: "",
            authors: "",
            description: "",
            summary: "",
            year: "",
            file: null,
            idTeacher: user.id,
          });
          setErrors({
            title: "",
            authors: "",
            description: "",
            summary: "",
            year: "",
            file: "",
          });
          fetchProject();
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

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await deleteResearchProject(deleteId);
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
        setTimeout(() => {
          navigate("/teacher/projects");
        }, 1000);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (!project) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Detales del proyecto" />

      <div className=" py-4 px-6.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="bg-white dark:bg-gray-800  flex flex-col sm:flex-row items-center gap-6  ">
          <div className="w-80 flex-shrink-0 overflow-hidden rounded-xl">
            <img
              src="https://img.innovaciondigital360.com/wp-content/uploads/2023/04/04175800/Que-es-un-sistema-operativo-Agustin-Jamele.jpg"
              alt="Proyecto"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h2>

            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Autores:
              </strong>{" "}
              {project.authors}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Enlace al pdf:
              </strong>{" "}
              {project.pdf}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">Año:</strong>{" "}
              {project.date ? project.date.split("T")[0] : ""}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Resumen:
              </strong>{" "}
              {project.summary}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Descripción:
              </strong>{" "}
              {project.description}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all shadow-md"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setDeleteId(id);
                }}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all shadow-md"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
          <div className="p-4 relative">
            <button
              className="absolute top-2 right-2 text-black dark:text-white hover:text-opacity-70"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h3 className="pb-2 text-xl font-bold text-black sm:text-2xl">
              Editar Artículo
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="row flex gap-4">
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Titulo
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Ingrese el título"
                      className={`w-full rounded border-[1.5px] ${
                        errors.title
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={formData.title}
                      onChange={handleInputChange}
                    />

                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>
                  <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Autores
                    </label>
                    <input
                      type="text"
                      name="authors"
                      placeholder="Ingrese los autores"
                      className={`w-full rounded border-[1.5px] ${
                        errors.authors
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={formData.authors}
                      onChange={handleInputChange}
                    />
                    {errors.authors && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.authors}
                      </p>
                    )}
                  </div>
                  <div className="w-full mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Seleccione el año
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="year"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errors.year
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        value={formData.year ? formData.year.split("T")[0] : ""}
                        onChange={handleInputChange}
                      />
                      {errors.year && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row flex gap-4">
                  <div className="w-full mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Resumen
                    </label>
                    <textarea
                      rows={2}
                      name="summary"
                      placeholder="Ingrese un pequeño resumen"
                      className={`w-full rounded border-[1.5px] ${
                        errors.summary
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={formData.summary}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.summary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.summary}
                      </p>
                    )}
                  </div>

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
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Cambiar documento
                  </label>
                  <FileUpload
                    allowedFormats={["pdf", "docx", "txt"]}
                    maxSizeMB={12}
                    onFileUpload={handleFileUpload}
                    error={errors.file}
                  />
                  {errors.file && (
                    <p className="text-red-500 text-sm mb-3">{errors.file}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Editar Proyecto
                </button>
              </div>
            </form>
          </div>
        </Modal>
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
          className="z-9999"
          transition={Bounce}
        />{" "}
        <ConfirmModal
          isOpen={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </>
  );
}
