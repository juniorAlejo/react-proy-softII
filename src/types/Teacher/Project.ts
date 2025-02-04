export interface ProjectFormData {
  id?: number;
  title: string;
  authors: string;
  description: string;
  summary: string;
  year: string;
  file: File | null;
  idTeacher?: string;
}

export interface ProjectGetAll {
  id?: number;
  name: string;
  description: string;
  summary: string;
  date: string;
  authors: string;
  pdf: string | File;
}
