import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { ResearchProjectDto } from "../../types/ResearchProject";

//---------------------------------------------------------------- GET RESEARCH PROJECT
export const getResearchProjects = async (): Promise<ResearchProjectDto[]> => {
  try {
    const { data } = await axios.get<ApiResponse<ResearchProjectDto[]>>(
      `${import.meta.env.VITE_API_URL}/Research/GetAllResearchProject`
    );
    return data.data; 
  } catch (error) {
    throw new Error("Error al obtener proyectos de investigación");
  }
};
