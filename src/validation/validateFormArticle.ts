import { Article } from "../types/Teacher/Article";

export const validateForm = (data: Article) => {
  let tempErrors: Record<string, string> = {};
  let isValid = true;

  if (!data.name.trim()) {
    tempErrors.name = "El título es requerido";
    isValid = false;
  } else if (data.name.length < 5) {
    tempErrors.name = "El título debe tener al menos 5 caracteres.";
    isValid = false;
  }

  if (!data.pdf.trim()) {
    tempErrors.pdf = "El enlace es requerido.";
    isValid = false;
  } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(data.pdf)) {
    tempErrors.pdf = "Formato de URL no válido.";
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
    tempErrors.description = "La descripción es requerida.";
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
    tempErrors.summary = "El resumen debe tener al menos 20 caracteres.";
    isValid = false;
  }

  if (!data.authors.trim()) {
    tempErrors.authors = "Los autores son requeridos.";
    isValid = false;
  }

  return { tempErrors, isValid };
};
