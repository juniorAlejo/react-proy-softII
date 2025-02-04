import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Edit, Trash2, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { getTeacherById, updateTeacher } from "../../services/Teacher/Teacher";
import Loader from "../../common/Loader";
import { TeacherDto } from "../../types/Teacher";
import { FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";
import Modal from "../../pages/Modal";
import { validateForm } from "../../validation/validateFormProfileTeacher";
import { validateFormFormation } from "../../validation/validateFormFormationTeacher";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { ProfileTeacher } from "../../types/Teacher/Teacher";
import { Formation } from "../../types/Teacher/FormationAcademic";
import {
  createFormationDocente,
  deleteFormationDocente,
  getFormationsByTeacherId,
  updateFormationDocente,
} from "../../services/Teacher/Formation";
import ConfirmModal from "../../components/ModalConfirm/ConfirmModal";

const TeacherProfile = () => {
  const userData = sessionStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [docente, setDocente] = useState<TeacherDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const [formations, setFormations] = useState<Formation[]>([]);
  const [dataFormation, setDataFormation] = useState<Formation>({
    id: 0,
    degree: "",
    title: "",
    studyCenter: "",
    countryOfStudy: "",
    source: "",
    idTeacher: 0,
  });

  const [errorsFormation, setErrorsFormation] = useState<
    Record<string, string>
  >({
    degree: "",
    title: "",
    studyCenter: "",
    countryOfStudy: "",
    source: "",
  });

  const [data, setData] = useState<ProfileTeacher>({
    id: user.id,
    firstName: "",
    lastName: "",
    dni: "",
    school: 0,
    mail: "",

    orcid: "",
    scopus: "",
    concytec: "",
    registrationCode: "",

    description: "",
    image: null,
    password: "",

    linkedIn: "",
    facebook: "",

    gender: true,
    position: "",
    phone: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    dni: "",
    school: "",
    mail: "",

    orcid: "",
    scopus: "",
    concytec: "",
    registrationCode: "",

    description: "",
    image: "",
    password: "",

    linkedIn: "",
    facebook: "",

    gender: "",
    position: "",
    phone: "",
    birthDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "file" && (e.target as HTMLInputElement).files) {
      const file = (e.target as HTMLInputElement).files![0];

      setData((prevData) => ({
        ...prevData,
        image: file,
      }));

      return;
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = validateForm({ ...data, [name]: value }).tempErrors;
      return {
        ...prevErrors,
        [name]: newErrors[name] || "",
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { tempErrors, isValid } = validateForm(data);
    setErrors(tempErrors);
    if (isValid) {
      try {
        console.log("asdasda");

        const formData = new FormData();
        formData.append("Id", user.id || "");
        formData.append("FirstName", data.firstName || "");
        formData.append("LastName", data.lastName || "");
        formData.append("Dni", data.dni || "");
        formData.append("School", data.school ? data.school.toString() : "");
        formData.append("Mail", data.mail || "");
        formData.append("Orcid", data.orcid || "");
        formData.append("Scopus", data.scopus || "");
        formData.append("Concytec", data.concytec || "");
        formData.append("RegistrationCode", data.registrationCode || "");
        formData.append("Description", data.description || "");
        if (data.image) {
          formData.append("Image", data.image);
        }
        formData.append("Password", data.password || "");
        formData.append("LinkedIn", data.linkedIn || "");
        formData.append("Facebook", data.facebook || "");
        formData.append("Gender", data.gender ? "False" : "True");

        formData.append("Position", data.position || "");
        formData.append("Phone", data.phone || "");
        formData.append("BirthDate", data.birthDate || "");

        const response = await updateTeacher(formData);
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
          try {
            const fetchedTeacher = await getTeacherById(user.id);
            setDocente(fetchedTeacher);
            sessionStorage.setItem("userData", JSON.stringify(fetchedTeacher));
            setData(user);
          } catch (error) {
            console.error("Error al obtener el docente:", error);
          }

          setData({
            id: user.id,
            firstName: "",
            lastName: "",
            dni: "",
            school: 0,
            mail: "",
            orcid: "",
            scopus: "",
            concytec: "",
            registrationCode: "",
            description: "",
            image: null,
            password: "",
            linkedIn: "",
            facebook: "",
            gender: true,
            position: "",
            phone: "",
            birthDate: "",
          });

          setErrors({
            firstName: "",
            lastName: "",
            dni: "",
            school: "",
            mail: "",
            orcid: "",
            scopus: "",
            concytec: "",
            registrationCode: "",
            description: "",
            image: "",
            password: "",
            linkedIn: "",
            facebook: "",
            gender: "",
            position: "",
            phone: "",
            birthDate: "",
          });
          window.location.reload();
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
        toast.error("Oops, algo salió mal!", {
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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  //---------------------------------------------------------------- CLIK MODAL
  const handleEditClickFormation = (data: Formation) => {
    setDataFormation(data);
    setIsModalOpen3(true);
  };
  const handleAddClickFormation = () => {
    setDataFormation({
      id: 0,
      degree: "",
      title: "",
      studyCenter: "",
      countryOfStudy: "",
      source: "",
      idTeacher: user.id,
    });
    setIsModalOpen3(true);
  };

  //---------------------------------------------------------------- GER FORMATIONS
  const fetchFormation = async () => {
    try {
      const formation = await getFormationsByTeacherId(user.id);

      setFormations(formation);
    } catch (error) {
      console.error("Error al obtener la formacion:", error);
    }
  };

  const handleInputChangeFormation = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDataFormation((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateFormFormation({
      ...dataFormation,
      [name]: value,
    });

    setErrorsFormation((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  const handleSaveFormation = async () => {
    const { tempErrors, isValid } = validateFormFormation(dataFormation);
    setErrorsFormation(tempErrors);
    if (isValid) {
      try {
        if (dataFormation.id === 0) {
          const response = await createFormationDocente(dataFormation);
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
            setDataFormation({
              degree: "",
              title: "",
              studyCenter: "",
              countryOfStudy: "",
              source: "",
              idTeacher: user.id,
            });
            setErrorsFormation({
              degree: "",
              title: "",
              studyCenter: "",
              countryOfStudy: "",
              source: "",
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
        } else {
          const response = await updateFormationDocente(dataFormation);
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
            setDataFormation({
              degree: "",
              title: "",
              studyCenter: "",
              countryOfStudy: "",
              source: "",
              idTeacher: user.id,
            });
            setErrorsFormation({
              degree: "",
              title: "",
              studyCenter: "",
              countryOfStudy: "",
              source: "",
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
        }
        fetchFormation();
        closeModal3();
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

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const fetchedTeacher = await getTeacherById(user.id);
        setDocente(fetchedTeacher);
        setData(user);
      } catch (error) {
        console.error("Error al obtener el docente:", error);
      }
    };
    fetchTeacher();
    fetchFormation();
  }, [user.id]);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await deleteFormationDocente(deleteId);
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
        fetchFormation();
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

  if (!docente) {
    return <Loader />;
  }
  return (
    <>
      <Breadcrumb pageName="Perfil" />

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 ">
        <div className="overflow-hidden rounded-sm border mr-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
          <div className="px-4 pb-6 text-center lg:pb-7 xl:pb-7">
            <div className="relative mt-4  mx-auto h-30 w-30 sm:h-40 sm:w-40 rounded-full bg-white/20 p-1 backdrop-blur">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={docente.image}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {docente.firstName} {docente.lastName}
              </h3>
              <p className="font-medium">Ingenieria informatica y sistemas</p>
              <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    Peru
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    {docente.gender ? "Masculino" : "Femenino"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    {docente.registrationCode}
                  </span>
                </div>
              </div>
              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  Descripcion
                </h4>
                <p className="mt-4.5">{docente.description}</p>
              </div>
              <div className="mt-6.5">
                <div className="flex items-center justify-center gap-3.5">
                  <a
                    href={docente.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={docente.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href={docente.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <button
                className="w-full bg-primary text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Edit className="w-5 h-5" />
                Editar docente
              </button>
            </div>
          </div>
        </div>
        {docente && (
          <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
            <div className="p-4 relative">
              <button
                className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                onClick={closeModal}
                aria-label="Cerrar"
              >
                ✕
              </button>

              <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                Editar Docente
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <div className="mb-4  w-2/5">
                    <label
                      htmlFor="firstName"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      className={`w-full rounded border-[1.5px] ${
                        errors.firstName
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="mb-4  w-2/5">
                    <label
                      htmlFor="lastName"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Apellidos
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      className={`w-full rounded border-[1.5px] ${
                        errors.lastName
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 w-1/5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Género
                    </label>
                    <select
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      value={docente.gender ? "true" : "false"}
                      onChange={(e) =>
                        setDocente((prev) => ({
                          ...prev!,
                          gender: e.target.value === "true",
                        }))
                      }
                    >
                      <option value="true">Masculino</option>
                      <option value="false">Femenino</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mb-4 w-1/4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Telefono
                    </label>
                    <input
                      id="phone"
                      type="number"
                      name="phone"
                      placeholder="+51"
                      className={`w-full rounded border-[1.5px] ${
                        errors.phone
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-1/4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Código de Registro
                    </label>
                    <input
                      id="registrationCode"
                      type="text"
                      name="registrationCode"
                      placeholder="0000"
                      className={`w-full rounded border-[1.5px] ${
                        errors.registrationCode
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.registrationCode}
                      onChange={handleInputChange}
                    />
                    {errors.registrationCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.registrationCode}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 w-1/4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="0000"
                      className={`w-full rounded border-[1.5px] ${
                        errors.password
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 w-1/4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fecha de Nacimiento
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="birthDate"
                        className={`form-datepicker w-full rounded border-[1.5px] ${
                          errors.birthDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent  px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        placeholder="mm/dd/yyyy"
                        data-class="flatpickr-right"
                        value={
                          data.birthDate ? data.birthDate.split("T")[0] : ""
                        }
                        onChange={handleInputChange}
                      />
                      {errors.birthDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.birthDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mb-4 w-1/3">
                    <label
                      htmlFor="firstName"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Linkedin
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errors.linkedIn
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.linkedIn}
                      onChange={handleInputChange}
                    />
                    {errors.linkedIn && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.linkedIn}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Facebook
                    </label>
                    <input
                      type="url"
                      name="facebook"
                      placeholder="Ingrese el enlace"
                      className={`w-full rounded border-[1.5px] ${
                        errors.facebook
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.facebook}
                      onChange={handleInputChange}
                    />
                    {errors.facebook && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.facebook}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Mail
                    </label>
                    <input
                      type="email"
                      name="mail"
                      placeholder="Ingrese el titulo"
                      className={`w-full rounded border-[1.5px] ${
                        errors.mail
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.mail}
                      onChange={handleInputChange}
                    />
                    {errors.mail && (
                      <p className="text-red-500 text-sm mt-1">{errors.mail}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mb-4  w-3/5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Ingrese el título"
                      className={`w-full rounded-md border-[1.5px] ${
                        errors.description
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      value={data.description}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-2/5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Imagen
                    </label>

                    <div className="relative">
                      {data.image && typeof data.image === "string" ? (
                        <div className="mb-3 w-full h-18 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                          <img
                            src={data.image}
                            alt="Imagen seleccionada"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-18 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded">
                          <span className="text-gray-500 dark:text-gray-300">
                            Imagen cargado!!
                          </span>
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      name="image"
                      className={`w-full rounded border-[1.5px] ${
                        errors.image
                          ? "border-red-500 dark:border-red-500"
                          : "border-stroke dark:border-form-strokedark"
                      } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setData((prevData) => ({
                            ...prevData,
                            image: file,
                          }));
                        }
                      }}
                    />

                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full lg:w-2/3">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                Formación Académica
              </h3>

              <button
                onClick={() => handleAddClickFormation()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Registrar
              </button>
            </div>

            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-2 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Grado
                    </th>
                    <th className=" py-2 px-4 font-medium text-black dark:text-white">
                      Título
                    </th>
                    <th className="py-2 px-4 font-medium text-black dark:text-white">
                      Centro de estudios
                    </th>
                    <th className=" py-2 px-4 font-medium text-black dark:text-white xl:pl-11">
                      País de Estudios
                    </th>
                    <th className=" py-2 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Fuente
                    </th>
                    <th className="py-2 px-4 font-medium text-black dark:text-white">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formations.length > 0 ? (
                    formations.map((formation, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <p className="text-black dark:text-white">
                            {formation.degree.length > 5
                              ? formation.degree.slice(0, 5) + "..."
                              : formation.degree}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {formation.title.length > 10
                              ? formation.title.slice(0, 10) + "..."
                              : formation.title}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {formation.studyCenter.length > 10
                              ? formation.studyCenter.slice(0, 10) + "..."
                              : formation.studyCenter}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <p className="text-black dark:text-white">
                            {formation.countryOfStudy}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <p className="text-black dark:text-white">
                            {formation.source.length > 5
                              ? formation.source.slice(0, 5) + "..."
                              : formation.source}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-primary">
                              <UserRoundPen
                                onClick={() =>
                                  handleEditClickFormation(formation)
                                }
                                className="text-primary dark:text-white"
                                size={21}
                              />
                            </button>
                            <button className="hover:text-primary">
                              <Trash2
                                className="text-primary dark:text-white"
                                size={21}
                                onClick={() => {
                                  setShowModal(true);
                                  setDeleteId(formation.id);
                                }}
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
                        No hay datos registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {dataFormation && (
              <Modal isOpen={isModalOpen3} onClose={closeModal3} size="lg">
                {dataFormation && (
                  <div className="p-4 relative">
                    <button
                      className="absolute top-2 right-2 text-black dark:text-white  hover:text-opacity-70 "
                      onClick={closeModal3}
                      aria-label="Cerrar"
                    >
                      ✕
                    </button>

                    <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                      {dataFormation.id === 0
                        ? "Registrar Formación Académica"
                        : "Editar Formación Académica"}
                    </h3>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Grado
                      </label>
                      <input
                        type="text"
                        name="degree"
                        placeholder="Ingrese el titulo"
                        className={`w-full rounded border-[1.5px] ${
                          errorsFormation.degree
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={dataFormation.degree}
                        onChange={handleInputChangeFormation}
                      />
                      {errorsFormation.degree && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsFormation.degree}
                        </p>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Ingrese el titulo"
                        className={`w-full rounded border-[1.5px] ${
                          errorsFormation.title
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={dataFormation.title}
                        onChange={handleInputChangeFormation}
                      />
                      {errorsFormation.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsFormation.title}
                        </p>
                      )}
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Centro de estudios
                      </label>
                      <input
                        type="text"
                        name="studyCenter"
                        placeholder="Ingrese el titulo"
                        className={`w-full rounded border-[1.5px] ${
                          errorsFormation.studyCenter
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={dataFormation.studyCenter}
                        onChange={handleInputChangeFormation}
                      />
                      {errorsFormation.studyCenter && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsFormation.studyCenter}
                        </p>
                      )}
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Pais de estudios
                      </label>
                      <input
                        type="text"
                        name="countryOfStudy"
                        placeholder="Ingrese el titulo"
                        className={`w-full rounded border-[1.5px] ${
                          errorsFormation.countryOfStudy
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={dataFormation.countryOfStudy}
                        onChange={handleInputChangeFormation}
                      />
                      {errorsFormation.countryOfStudy && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsFormation.countryOfStudy}
                        </p>
                      )}
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Fuente
                      </label>
                      <input
                        type="text"
                        name="source"
                        placeholder="Ingrese el titulo"
                        className={`w-full rounded border-[1.5px] ${
                          errorsFormation.source
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={dataFormation.source}
                        onChange={handleInputChangeFormation}
                      />
                      {errorsFormation.source && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsFormation.source}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded"
                        onClick={handleSaveFormation}
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                )}
              </Modal>
            )}
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
        <ConfirmModal
          isOpen={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default TeacherProfile;
