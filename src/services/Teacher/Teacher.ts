import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { TeacherDto } from "../../types/Teacher";
import { ProfileTeacher } from "../../types/Teacher/Teacher";

//---------------------------------------------------------------- GET TEACHERS
export const getTeachers = async (): Promise<TeacherDto[]> => {
  try {
    const { data } = await axios.get<ApiResponse<TeacherDto[]>>(
      `${import.meta.env.VITE_API_URL}/Teacher`
    );
    return data.data;
  } catch (error) {
    throw new Error("Error al obtener docentes");
  }
};

//---------------------------------------------------------------- GET TEACHER BY ID
export const getTeacherById = async (id: number): Promise<TeacherDto> => {
  try {
    const { data } = await axios.get<ApiResponse<TeacherDto>>(
      `${import.meta.env.VITE_API_URL}/Teacher/GetById/${id}`
    );
    return data.data; 
  } catch (error) {
    throw new Error("Error al obtener docente");
  }
};

//---------------------------------------------------------------- CREATE TEACHER
export const addTeacher = async (teacherData: ProfileTeacher): Promise<ApiResponse<ProfileTeacher>> => {
  try {
    const { data } = await axios.post<ApiResponse<ProfileTeacher>>(
      `${import.meta.env.VITE_API_URL}/Teacher/AddTeacher`, 
      teacherData
    );
    return data; 
  } catch (error) {
    throw new Error("Error al crear docente");
  }
};

//---------------------------------------------------------------- UPDATE TEACHER
export const updateTeacher = async (formData: FormData): Promise<ApiResponse<ProfileTeacher>> => {
  try {
    const { data } = await axios.put<ApiResponse<ProfileTeacher>>(
      `${import.meta.env.VITE_API_URL}/Teacher/UpdateTeacher`,
      formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        }
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error al actualizar docente");
  }
};
