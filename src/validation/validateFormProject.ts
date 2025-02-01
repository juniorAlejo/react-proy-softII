import { ProjectFormData } from "../types/Teacher/Project";

export const validateForm = (formData: ProjectFormData) => {
  let tempErrors: Record<string, string> = {}; 
  let isValid = true;

  if (!formData.title) {
    tempErrors.title = "El título es requerido";
    isValid = false;
  } else if (formData.title.length < 5) {
    tempErrors.title = "El título debe tener al menos 5 caracteres.";
    isValid = false;
  }

  if (!formData.authors) {
    tempErrors.authors = "Los autores son requeridos.";
    isValid = false;
  }

  if (!formData.year) {
    tempErrors.year = "El año es requerido.";
    isValid = false;
  }

  if (!formData.description.trim()) {
    tempErrors.description = "La descripción es requerida.";
    isValid = false;
  } else if (formData.description.length < 10) {
    tempErrors.description = "La descripción debe tener al menos 10 caracteres.";
    isValid = false;
  }

  if (!formData.file) {
    tempErrors.file = "El archivo es requerido.";
    isValid = false;
  }

  return { tempErrors, isValid };
};
