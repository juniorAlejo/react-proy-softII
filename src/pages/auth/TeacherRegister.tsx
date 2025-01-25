import React from "react";
import { Link } from "react-router-dom";
import LogoDark from "../../assets/img/logo_universidad.png";
import LogoAuth from "../../assets/svg/auth.svg";
import {
    LockKeyhole,
    Mail,
    User,
    IdCard, 
    GraduationCap,
    Building2
} from "lucide-react";

const TeacherRegister: React.FC = () => {
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

              <form>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Inhgresa tu nombre completo"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
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
                        placeholder="Ingrese sus apellidos"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
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
                        type="text"
                        placeholder="Ingrese su DNI"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <IdCard  color="#808080" size={21} />
                      </span>
                    </div>
                  </div>

                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Carrera
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingrese su carrera"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <GraduationCap color="#808080" size={21} />
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Ingrese su mail"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <Mail color="#808080" size={21} />
                      </span>
                    </div>
                  </div>                  <div className="w-1/2 px-4 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                    CONCYTEC
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingrese el url"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
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
                        placeholder="6+ caracteres, 1 letra mayúscula"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <LockKeyhole color="#808080" size={21} />
                      </span>
                    </div>
                  </div>

                  <div className="w-1/2 px-4 mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Repeite contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Re-6+ caracteres, 1 letra mayúscula"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
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
      </div>
    </>
  );
};

export default TeacherRegister;
