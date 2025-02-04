import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  enviarVerificacionEmail,
  verificarCodigo,
} from "../../services/Teacher/Login";
import { ToastContainer, Bounce, toast } from "react-toastify";

export default function VerificationAccount() {
  const navigate = useNavigate();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [verifying, setVerifying] = useState(false);

  //const emailRegex = /^[a-zA-Z._-]+@unamba\.edu\.pe$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@unamba\.edu\.pe$/;

  //---------------------------------------------------------------- VALIDATION MAIL
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!inputEmail) {
      setErrorMessage("Campo requerido");
    } else if (!emailRegex.test(inputEmail)) {
      setErrorMessage("Correo electrónico inválido");
    } else {
      setErrorMessage("");
    }
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...verificationCode];
    newCode[index] = e.target.value;
    setVerificationCode(newCode);
  };

  //---------------------------------------------------------------- POST MAIL
  const handleEmailSubmit = async () => {
    if (!email || errorMessage) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await enviarVerificacionEmail(email);
      if (response.success) {
        setEmailSubmitted(true);
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
      } else {
      }
    } catch (error) {
      toast.error("Opps, algo salió mal!", {
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
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------------------------------- RESEND MAIL
  const handleResendCode = async () => {
    if (!email || errorMessage) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await enviarVerificacionEmail(email);
      if (response.success) {
        toast.success("Código reenviado exitosamente.", {
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
      toast.error("Error al reenviar el código.", {
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
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------------------------------- VERIFICATION MAIL
  const handleCodeVerification = async () => {
    if (verificationCode.join("").length < 4) {
      setErrorMessage("Por favor ingresa todos los dígitos del código.");
      return;
    }

    setVerifying(true);
    setErrorMessage("");

    try {
      const code = verificationCode.join("");
      const response = await verificarCodigo(email, code);
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
          navigate("/teacher/register", { state: { email } });
        }, 1500);
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
      toast.error("Código inválido. Inténtalo de nuevo.", {
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
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 py-10 max-w-md w-full">
        {!emailSubmitted ? (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              ¡Te vamos a enviar un código!
            </h2>
            <p className="text-md font-semibold text-gray-600 text-center mb-6">
              Te vamos a enviar un código de verificación y asegurarnos de que
              eres tú.
            </p>
            <input
              type="email"
              placeholder="Ingrese tú correo electrónico Institucional"
              value={email}
              onChange={handleEmailChange}
              className={`w-full rounded border-[1.5px] ${
                errorMessage
                  ? "border-red-500 dark:border-red-500"
                  : "border-stroke dark:border-form-strokedark"
              } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <div className="text-left w-full">
              {errorMessage && (
                <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
              )}
            </div>

            <button
              onClick={handleEmailSubmit}
              className={`flex w-full items-center text-white justify-center mt-4 gap-3.5 rounded-lg border border-stroke bg-primary p-4 hover:bg-primary_light ${
                loading && "opacity-50 "
              }`}
            >
              {loading ? "Enviando..." : "Enviar Código"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verifique Su Cuenta
            </h2>
            <p className="text-md font-semibold text-gray-600 text-center mb-6">
              Ingrese el código de 4 dígitos enviado a{" "}
              <span className="font-bold">{email}</span>.
            </p>
            <div className="flex justify-between mb-1 space-x-3">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleVerificationCodeChange(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 text-primary"
                />
              ))}
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
            )}
            <div className="flex text-sm text-gray-600 mb-6">
              ¿No recibió un código?{" "}
              <button
                onClick={handleResendCode}
                disabled={loading}
                className={`ml-1 text-primary font-semibold hover:underline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Reenviando..." : "Reenviar"}
              </button>
            </div>
            <button
              onClick={handleCodeVerification}
              disabled={verifying}
              className={`flex w-full items-center ${
                verifying && "opacity-50 "
              } text-white justify-center gap-3.5 rounded-lg border border-stroke bg-primary p-4 hover:bg-primary_light`}
            >
              {verifying ? "Verificando..." : "Verificar"}
            </button>
          </div>
        )}
        <div className="mt-6 text-center">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/teacher/login" className="text-primary">
              Iniciar sesión
            </Link>
          </p>
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
        transition={Bounce}
      />
    </div>
  );
}
