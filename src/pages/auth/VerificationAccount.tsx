import { useState } from "react";
import { Link } from "react-router-dom";

export default function VerificationAccount() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    if (email) {
      setEmailSubmitted(true);
    } else {
      alert("Por favor, ingrese su correo electrónico.");
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
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-md mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleEmailSubmit}
              className="flex w-full items-center text-white justify-center gap-3.5 rounded-lg border border-stroke bg-primary p-4 hover:bg-primary_light"
            >
              Enviar Código
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
            <div className="flex justify-between mb-6 space-x-3">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:text-primary"
                  />
                ))}
            </div>
            <div className="flex text-sm text-gray-600 mb-6">
              ¿No recibió un código?{" "}
              <button className="ml-1 text-primary font-semibold hover:underline">
                Reenviar
              </button>
            </div>
            <button className="flex w-full items-center text-white justify-center gap-3.5 rounded-lg border border-stroke bg-primary p-4 hover:bg-primary_light">
              Verificar
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
    </div>
  );
}
