import axios from "axios";
import { Login } from "../../types/Teacher/ProfileTeacher";


export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      "https://bkzonafit.jhedgost.com/api/user/login",
      loginData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};