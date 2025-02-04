import axios from "axios";
import { ApiResponse } from "../../types/Response/ApiResponse";
import { ScientificArticleDto } from "../../types/ScientificArticle";

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
