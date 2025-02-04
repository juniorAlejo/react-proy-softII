import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { Formation } from "../../types/Teacher/FormationAcademic";

//---------------------------------------------------------------- GET FORMATION
export const getFormationsByTeacherId = async (
  teacherId: any
): Promise<Formation[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Formation[]>>(
      `${
        import.meta.env.VITE_API_URL
      }/Teacher/GetAllEducationFormationsByTeacherId/${teacherId}`
    );

    if (data.success) {
      return data.data;
    } else {
      console.error("Error en la respuesta de la API:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener las formaciones:", error);
    return [];
  }
};

//---------------------------------------------------------------- CREATE FORMATION
export const createFormationDocente = async (
  article: Formation
): Promise<ApiResponse<Formation>> => {
  try {
    const { data } = await axios.post<ApiResponse<Formation>>(
      `${import.meta.env.VITE_API_URL}/Teacher/CreateEducationFormation`,
      article
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear la la formacion");
  }
};

//---------------------------------------------------------------- UPDATE FORMATION
export const updateFormationDocente = async (
  article: Formation
): Promise<ApiResponse<Formation>> => {
  try {
    const { data } = await axios.put<ApiResponse<Formation>>(
      `${import.meta.env.VITE_API_URL}/Teacher/UpdateEducationFormation`,
      article
    );
    return data;
  } catch (error) {
    throw new Error("Error al actulizar la formacion");
  }
};

//---------------------------------------------------------------- DELETE FORMATION
export const deleteFormationDocente = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Teacher/DeleteEducationFormation/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar la formacion del docente");
  }
};
