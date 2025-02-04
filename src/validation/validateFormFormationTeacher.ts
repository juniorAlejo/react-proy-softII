export const validateFormFormation = (formData: any) => {
  let tempErrors: Record<string, string> = {}; 
  let isValid = true;

  if (!formData.degree) {
    tempErrors.degree = "El grado académico es obligatorio.";
    isValid = false;
  } else if (formData.degree.length < 2) {
    tempErrors.degree = "El grado académico debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.title) {
    tempErrors.title = "El título es obligatorio.";
    isValid = false;
  } else if (formData.title.length < 2) {
    tempErrors.title = "El título debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.studyCenter) {
    tempErrors.studyCenter = "El centro de estudios es obligatorio.";
    isValid = false;
  } else if (formData.studyCenter.length < 2) {
    tempErrors.studyCenter = "El centro de estudios debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.countryOfStudy) {
    tempErrors.countryOfStudy = "El país de estudio es obligatorio.";
    isValid = false;
  } else if (formData.countryOfStudy.length < 2) {
    tempErrors.countryOfStudy = "El país de estudio debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.source) {
    tempErrors.source = "La fuente de información es obligatoria.";
    isValid = false;
  } else if (formData.source.length < 2) {
    tempErrors.source = "La fuente de información debe tener al menos 2 caracteres.";
    isValid = false;
  }

  return { tempErrors, isValid };
};
