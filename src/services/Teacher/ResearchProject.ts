import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { ResearchProjectDto } from "../../types/ResearchProject";
import { ProjectFormData, ProjectGetAll } from "../../types/Teacher/Project";

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

//---------------------------------------------------------------- CREATE RESEARCH PROJECT
export const createResearchProject = async (
  project: ProjectFormData
): Promise<ApiResponse<ProjectFormData>> => {
  try {
    const formData = new FormData();

    Object.entries(project).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    const { data } = await axios.post<ApiResponse<ProjectFormData>>(
      `${import.meta.env.VITE_API_URL}/Research/CreateResearchProject`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error("Error al crear el proyecto");
  }
};

//---------------------------------------------------------------- GET ARTICLE BY TEACHER ID
export const getResearchProjectByTeacherId = async (
  teacherId: number
): Promise<ProjectGetAll[]> => {
  try {
    const { data } = await axios.get<ApiResponse<ProjectGetAll[]>>(
      `${import.meta.env.VITE_API_URL}/Research/GetResearchProjectsByTeacherId/${teacherId}`
    );
    return data.data;
  } catch (error) {
    throw new Error("Error al obtener proyectos del docente");
  }
};

//---------------------------------------------------------------- GET ARTICLE BY TEACHER ID
export const getProjectGetById= async (
  projectId: string
): Promise<any> => {
  try {
    const { data } = await axios.get<ApiResponse<any>>(
      `${import.meta.env.VITE_API_URL}/Research/GetResearchProjectById/${projectId}`
    );
    return data.data;
  } catch (error) {
    throw new Error("Error al obtener el proyecto");
  }
};

//---------------------------------------------------------------- UPDATE PROJECT
export const updateResearchProject = async (
  projectData: ProjectFormData
): Promise<ApiResponse<ProjectFormData>> => {
  try {
    const formData = new FormData();

    Object.entries(projectData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    const { data } = await axios.put<ApiResponse<ProjectFormData>>(
      `${import.meta.env.VITE_API_URL}/Research/UpdateResearchProject`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error("Error al actualizar el proyecto");
  }
};

//---------------------------------------------------------------- DELETE ARTICLE
export const deleteResearchProject = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Research/DeleteResearchProject/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar el articulo del docente");
  }
};