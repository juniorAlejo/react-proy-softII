import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import {
  ExperienceLaboral,
  ExperienceLaboralDocente,
  ExperienceTesis,
} from "../../types/Teacher/Experience";

//---------------------------------------------------------------- CREATE EXPERIENCE LABORAL
export const createExperienceLaboral = async (
  experiencia: ExperienceLaboral
): Promise<ApiResponse<ExperienceLaboral>> => {
  try {
    const { data } = await axios.post<ApiResponse<ExperienceLaboral>>(
      `${import.meta.env.VITE_API_URL}/Teacher/CreateWorkExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear la experiencia laboral");
  }
};

//---------------------------------------------------------------- UPDATE EXPERIENCE LABORAL
export const updateExperienceLaboral = async (
  experiencia: ExperienceLaboral
): Promise<ApiResponse<ExperienceLaboral>> => {
  try {
    const { data } = await axios.put<ApiResponse<ExperienceLaboral>>(
      `${import.meta.env.VITE_API_URL}/Teacher/UpdateWorkExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al actualizar la experiencia laboral");
  }
};

//---------------------------------------------------------------- DELETE EXPERIENCE LABORAL 
export const deleteExperienceLaboral = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Teacher/DeleteWorkExperience/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar la experiencia laboral");
  }
};

//---------------------------------------------------------------- CREATE EXPERIENCE LABORAL DOCENTE
export const createExperienceLaboralDocente = async (
  experiencia: ExperienceLaboralDocente
): Promise<ApiResponse<ExperienceLaboralDocente>> => {
  try {
    const { data } = await axios.post<ApiResponse<ExperienceLaboralDocente>>(
      `${import.meta.env.VITE_API_URL}/Teacher/CreateTeachingExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear la experiencia laboral docente");
  }
};

//---------------------------------------------------------------- UPDATE EXPERIENCE LABORAL DOCENTE
export const updateExperienceLaboralDocente = async (
  experiencia: ExperienceLaboralDocente
): Promise<ApiResponse<ExperienceLaboralDocente>> => {
  try {
    const { data } = await axios.put<ApiResponse<ExperienceLaboralDocente>>(
      `${import.meta.env.VITE_API_URL}/Teacher/UpdateTeachingExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al actualizar la experiencia laboral de docente");
  }
};

//---------------------------------------------------------------- DELETE EXPERIENCE LABORAL DOCENTE
export const deleteExperienceLaboralDocente = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Teacher/DeleteTeachingExperience/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar la experiencia laboral docente");
  }
};

//---------------------------------------------------------------- CREATE EXPERIENCE TESIS
export const createExperienceTesis = async (
  experiencia: ExperienceTesis
): Promise<ApiResponse<ExperienceTesis>> => {
  try {
    const { data } = await axios.post<ApiResponse<ExperienceTesis>>(
      `${import.meta.env.VITE_API_URL}/Teacher/CreateThesisAdvisingExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear la experiencia tesis");
  }
};

//---------------------------------------------------------------- UPDATE EXPERIENCE TESIS
export const updateExperienceTesis = async (
  experiencia: ExperienceTesis
): Promise<ApiResponse<ExperienceTesis>> => {
  try {
    const { data } = await axios.put<ApiResponse<ExperienceTesis>>(
      `${import.meta.env.VITE_API_URL}/Teacher/UpdateThesisAdvisingExperience`,
      experiencia
    );
    return data;
  } catch (error) {
    throw new Error("Error al actualizar la experiencia de tesis");
  }
};
//---------------------------------------------------------------- DELETE EXPERIENCE TESIS
export const deleteExperienceTesis = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Teacher/DeleteThesisAdvisingExperience/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar la experiencia de tesis");
  }
};
