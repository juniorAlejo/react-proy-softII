import { Article } from "../types/Teacher/Article";

export const validateForm = (data: Article) => {
  let tempErrors: Record<string, string> = {};
  let isValid = true;

  if (!data.title.trim()) {
    tempErrors.title = "El título es requerido";
    isValid = false;
  } else if (data.title.length < 5) {
    tempErrors.title = "El título debe tener al menos 5 caracteres.";
    isValid = false;
  }

  if (!data.link.trim()) {
    tempErrors.link = "El enlace es requerido.";
    isValid = false;
  } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(data.link)) {
    tempErrors.link = "Formato de URL no válido.";
    isValid = false;
  }

  if (!data.doi.trim()) {
    tempErrors.doi = "El DOI es requerido";
    isValid = false;
  }

  if (!data.date) {
    tempErrors.date = "El año es requerido.";
    isValid = false;
  }

  if (!data.description.trim()) {
    tempErrors.description = "La descripción es requerido.";
    isValid = false;
  } else if (data.description.length < 10) {
    tempErrors.description =
      "La descripción debe tener al menos 10 caracteres.";
    isValid = false;
  }

  if (!data.summary.trim()) {
    tempErrors.summary = "El resumen es requerido.";
    isValid = false;
  } else if (data.summary.length < 20) {
    tempErrors.summary = "El resumen debe tener al menos 10 caracteres.";
    isValid = false;
  }

  return { tempErrors, isValid };
};
