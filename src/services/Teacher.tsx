import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { TeacherDto } from "../types/Teacher";

//---------------------------------------------------------------- GET TEACHERS
export const getTeacher = async (): Promise<TeacherDto[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_URL}/Teacher`
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error("Error al obtener docentes");
  }
};
