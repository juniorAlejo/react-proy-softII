import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { ResearchProjectDto } from "../types/ResearchProject";

//---------------------------------------------------------------- GET RESEARCH PROJECT
export const getResearchProject = async (): Promise<ResearchProjectDto[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_API_URL}/Research/GetAllResearchProject`
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error("Error al obtener proyectos de investigacion");
  }
};
