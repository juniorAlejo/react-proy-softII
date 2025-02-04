import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDark from "../../assets/img/logo_universidad.png";
import LogoAuth from "../../assets/svg/auth.svg";
import { LockKeyhole, Mail, User, IdCard, Building2 } from "lucide-react";
import { ProfileTeacherRegister } from "../../types/Teacher/Teacher";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { validateForm } from "../../validation/validateFormTeacher";
import { addTeacher } from "../../services/Teacher/Teacher";

const TeacherRegister: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProfileTeacherRegister>({
    firstName: "",
    lastName: "",
    dni: "",
    school: 0,
    concytec: "",
    confirmPassword: "",
    description:
      "Soy un docente apasionado por la enseñanza, comprometido con el desarrollo académico y personal de mis estudiantes. Mi objetivo es fomentar el pensamiento crítico y crear un ambiente de aprendizaje inclusivo y motivador.",
    image:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    password: "",

    mail: email,
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    dni: "",
    school: "",
    confirmPassword: "",
    concytec: "",

    description: "",
    image: "",
    password: "",

    mail: "",
  });

  //----------------------- INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { tempErrors } = validateForm({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: tempErrors[name],
    }));
  };

  //---------------------------------------------------------------- POST TEACHER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { tempErrors, isValid } = validateForm(formData);
    setErrors(tempErrors);

    if (isValid) {
      try {
        const { confirmPassword, ...dataToSend } = formData;
        const response = await addTeacher(dataToSend);

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
          setTimeout(() => {
            navigate("/teacher/login");
          }, 1000);
        } else {
          toast.error("Erro de backend", {
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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-2/5">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="dark:hidden w-50" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Crea tu cuenta de manera rápida y sencilla.
              </p>

              <span className="mt-15 inline-block">
                <img className="dark:hidden w-70" src={LogoAuth} alt="Logo" />
              </span>
            </div>
          </div>

          <div className="w-full xl:w-3/5 border-stroke dark:border-strokedark xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Regístrate aqui!
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Ingrese tú nombre"
                        className={`w-full rounded border-[1.5px] ${
                          errors.firstName
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <User color="#808080" size={21} />
                      </span>
                    </div>
                  </div>

                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Apellidos
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Ingrese tus apellidos"
                        className={`w-full rounded border-[1.5px] ${
                          errors.lastName
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />

                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <User color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      DNI
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="dni"
                        placeholder="Ingrese tú DNI"
                        className={`w-full rounded border-[1.5px] ${
                          errors.dni
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.dni}
                        onChange={handleInputChange}
                      />
                      {errors.dni && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dni}
                        </p>
                      )}
                      <span className="absolute right-4  top-3  bg-white h-8">
                        <IdCard color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Escuela Profesional
                    </label>
                    <div className="relative">
                      <select
                        name="school"
                        className={`w-full rounded border-[1.5px] ${
                          errors.school
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.school}
                        onChange={handleInputChange}
                      >
                        <option
                          value={1}
                          className="text-body dark:text-bodydark"
                        >
                          Ingeniería Informática y Sistemas
                        </option>
                        <option
                          value={2}
                          className="text-body dark:text-bodydark"
                        >
                          Administración de Empresas
                        </option>
                        <option
                          value={3}
                          className="text-body dark:text-bodydark"
                        >
                          Ingeniería de Minas
                        </option>
                        <option
                          value={4}
                          className="text-body dark:text-bodydark"
                        >
                          Ingeniería Agroindustrial
                        </option>
                        <option
                          value={5}
                          className="text-body dark:text-bodydark"
                        >
                          Ingeniería Civil
                        </option>
                        <option
                          value={6}
                          className="text-body dark:text-bodydark"
                        >
                          Ciencias Políticas
                        </option>

                        <option
                          value={8}
                          className="text-body dark:text-bodydark"
                        >
                          Educación Inicial Intercultural I y II etapa
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="mail"
                        placeholder="Ingrese tus email"
                        disabled
                        className={`w-full rounded border-[1.5px] ${
                          errors.mail
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={email}
                      />

                      <span className="absolute right-4 top-4">
                        <Mail color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      CONCYTEC
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="concytec"
                        placeholder="Ingrese tu concytec"
                        className={`w-full rounded border-[1.5px] ${
                          errors.concytec
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.concytec}
                        onChange={handleInputChange}
                      />

                      {errors.concytec && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.concytec}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <Building2 color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        placeholder="Ingrese tu contraseña"
                        className={`w-full rounded border-[1.5px] ${
                          errors.password
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <LockKeyhole color="#808080" size={21} />
                      </span>
                    </div>
                  </div>

                  <div className="w-1/2 px-4 mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Repite la contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Ingrese tu contraseña"
                        className={`w-full rounded border-[1.5px] ${
                          errors.confirmPassword
                            ? "border-red-500 dark:border-red-500"
                            : "border-stroke dark:border-form-strokedark"
                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <LockKeyhole color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Crear una cuenta"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/teacher/login" className="text-primary">
                      Iniciar sesión
                    </Link>
                  </p>
                </div>
              </form>
            </div>
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

export default TeacherRegister;
