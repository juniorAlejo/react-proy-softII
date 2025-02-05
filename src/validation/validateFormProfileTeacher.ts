export const validateForm = (formData: any) => {
  let tempErrors: Record<string, string> = {}; 
  let isValid = true;

  if (!formData.firstName) {
    tempErrors.firstName = "El nombre es obligatorio.";
    isValid = false;
  } else if (formData.firstName.length < 2) {
    tempErrors.firstName = "El nombre debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.lastName) {
    tempErrors.lastName = "El apellido es obligatorio.";
    isValid = false;
  } else if (formData.lastName.length < 2) {
    tempErrors.lastName = "El apellido debe tener al menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.renacyt) {
    tempErrors.renacyt = "El código renacyt es obligatorio.";
    isValid = false;
  }

  if (!formData.birthDate) {
    tempErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    isValid = false;
  }



  if (!formData.mail) {
    tempErrors.mail = "El correo electrónico es obligatorio.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
    tempErrors.mail = "Correo electrónico inválido.";
    isValid = false;
  }

  if (!formData.description) {
    tempErrors.description = "La descripción es obligatoria.";
    isValid = false;
  } else if (formData.description.length < 10) {
    tempErrors.description = "La descripción debe tener al menos 10 caracteres.";
    isValid = false;
  }

  return { tempErrors, isValid };
};

