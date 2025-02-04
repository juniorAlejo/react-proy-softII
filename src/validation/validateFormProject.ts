import { ProjectFormData } from "../types/Teacher/Project";

export const validateForm = (formData: ProjectFormData) => {
  let tempErrors: Record<string, string> = {};
  let isValid = true;

  if (!formData.title) {
    tempErrors.title = "El título es requerido";
    isValid = false;
  } else if (formData.title.length < 10) {
    tempErrors.title = "El título debe tener al menos 10 caracteres.";
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
  } else if (formData.description.length < 20) {
    tempErrors.description =
      "La descripción debe tener al menos 20 caracteres.";
    isValid = false;
  }

  if (!formData.summary.trim()) {
    tempErrors.summary = "El resumen es requerido.";
    isValid = false;
  } else if (formData.summary.length < 25) {
    tempErrors.summary = "El resumen debe tener al menos 25 caracteres.";
    isValid = false;
  }

  if (!formData.file) {
    tempErrors.file = "El archivo es requerido.";
    isValid = false;
  }

  return { tempErrors, isValid };
};


export const validateFormUpdate = (formData: ProjectFormData) => {
  let tempErrors: Record<string, string> = {};
  let isValid = true;

  if (!formData.title) {
    tempErrors.title = "El título es requerido";
    isValid = false;
  } else if (formData.title.length < 10) {
    tempErrors.title = "El título debe tener al menos 10 caracteres.";
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
  } else if (formData.description.length < 20) {
    tempErrors.description =
      "La descripción debe tener al menos 20 caracteres.";
    isValid = false;
  }

  if (!formData.summary.trim()) {
    tempErrors.summary = "El resumen es requerido.";
    isValid = false;
  } else if (formData.summary.length < 25) {
    tempErrors.summary = "El resumen debe tener al menos 25 caracteres.";
    isValid = false;
  }

  return { tempErrors, isValid };
};
