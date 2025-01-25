import axios from "axios";
import { ApiResponse } from "../types/Response/ApiResponse";
import { ScientificArticleDto } from "../types/ScientificArticle";

//---------------------------------------------------------------- GET ARTICLES
 export const getScientificArticle = async (): Promise<ScientificArticleDto[]> => {
   try {
     const response = await axios.get<ApiResponse>(
       `${import.meta.env.VITE_API_URL}/Research/GetAllScientificArticle`
     );
     if (response.data.success) {
       return response.data.data;
     } else {
       throw new Error(response.data.msg);
     }
   } catch (error) {
     throw new Error("Error al obtener articulos");
   }
 };
