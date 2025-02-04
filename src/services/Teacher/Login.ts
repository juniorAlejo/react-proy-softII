import axios from "axios";
import { Login } from "../../types/Teacher/Auth";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { ProfileTeacher } from "../../types/Teacher/Teacher";

export const login = async (loginData: Login): Promise<ApiResponse<ProfileTeacher>> => {
  try {
    const response = await axios.post<ApiResponse<ProfileTeacher>>(
      `${import.meta.env.VITE_API_URL}/Teacher/Login`,
      loginData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

//---------------------------------------------------------------- VERIFICATE MAIL
export const enviarVerificacionEmail = async (
  email: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Teacher/SendCodeValidation/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: ApiResponse<void> = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API: Error al enviar la verificación de email");
    }

    return data;
  } catch (error) {
    console.error("API: Error al enviar la verificación de email", error);
    throw new Error("Error al enviar la verificación de email");
  }
};

//---------------------------------------------------------------- VERIFICATE CODE
export const verificarCodigo = async (
  Email: string,
  Code: string
): Promise<ApiResponse<void>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/Teacher/ValidateMail?Email=${encodeURIComponent(
      Email
    )}&Code=${encodeURIComponent(Code)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("API: Error al verificar el código");
    }

    const data: ApiResponse<void> = await response.json();
    return data;
  } catch (error) {
    console.error("API: Error al verificar el código", error);
    throw error;
  }
};