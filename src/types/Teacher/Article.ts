export interface Article {
  id?:number;
  idTeacher?:number
  name: string;
  description: string;
  summary: string;
  date: string;
  doi: string;
  authors: string;
  pdf:string;
  estatus: number;
  idNivel: number;
}
