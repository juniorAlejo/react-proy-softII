import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { ScientificArticleDto } from "../../types/ScientificArticle";
import { Article } from "../../types/Teacher/Article";

//---------------------------------------------------------------- GET ARTICLES
export const getScientificArticles = async (): Promise<ScientificArticleDto[]> => {
  try {
    const { data } = await axios.get<ApiResponse<ScientificArticleDto[]>>(
      `${import.meta.env.VITE_API_URL}/Research/GetAllScientificArticle`
    );
    return data.data;
  } catch (error) {
    throw new Error("Error al obtener artículos");
  }
};

//---------------------------------------------------------------- GET ARTICLE BY TEACHER ID
export const getScientificArticlesByTeacherId = async (
  teacherId: number
): Promise<Article[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Article[]>>(
      `${import.meta.env.VITE_API_URL}/Research/GetScientificArticlesByTeacherId/${teacherId}`
    );
    return data.data;
  } catch (error) {
    throw new Error("Error al obtener artículos del docente");
  }
};


//---------------------------------------------------------------- CREATE ARTICLE
export const createArticleDocente = async (
  article: Article
): Promise<ApiResponse<Article>> => {
  try {
    const { data } = await axios.post<ApiResponse<Article>>(
      `${import.meta.env.VITE_API_URL}/Research/CreateScientificArticle`,
      article
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear la el articulo");
  }
};



//---------------------------------------------------------------- UPDATE ARTICLE
export const updateArticleDocente = async (
  article: Article
): Promise<ApiResponse<Article>> => {
  try {
    const { data } = await axios.put<ApiResponse<Article>>(
      `${import.meta.env.VITE_API_URL}/Research/UpdateScientificArticle`,
      article
    );
    return data;
  } catch (error) {
    throw new Error("Error al actulizar la el articulo");
  }
};

//---------------------------------------------------------------- DELETE ARTICLE
export const deleteArticleDocente = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete<ApiResponse<null>>(
      `${import.meta.env.VITE_API_URL}/Research/DeleteScientificArticle/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar el articulo del docente");
  }
};