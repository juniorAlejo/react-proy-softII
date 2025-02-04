import { ProfileTeacherRegister } from "../types/Teacher/Teacher";

export const validateForm = (formData: ProfileTeacherRegister) => {
  let tempErrors: Record<string, string> = {}; 
  let isValid = true;

  if (!formData.firstName.trim()) {
    tempErrors.firstName = "El nombre es requerido.";
    isValid = false;
  }

  if (!formData.lastName.trim()) {
    tempErrors.lastName = "El apellido es requerido.";
    isValid = false;
  }

  if (!formData.dni.trim()) {
    tempErrors.dni = "El DNI es requerido.";
    isValid = false;
  } else if (!/^\d{8}$/.test(formData.dni)) {
    tempErrors.dni = "El DNI debe tener exactamente 8 dígitos.";
    isValid = false;
  }


  if (!formData.description.trim()) {
    tempErrors.description = "La descripción es requerida.";
    isValid = false;
  } else if (formData.description.length < 10) {
    tempErrors.description = "La descripción debe tener al menos 10 caracteres.";
    isValid = false;
  }

  if (!formData.password.trim()) {
    tempErrors.password = "La contraseña es requerida.";
    isValid = false;
  } else if (formData.password.length < 6) {
    tempErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    isValid = false;
  }


  // if (!formData.mail.trim()) {
  //   tempErrors.mail = "El correo electrónico es requerido.";
  //   isValid = false;
  // }else if (!/^[a-zA-Z._-]+@unamba\.edu\.pe$/.test(formData.mail)) {
  //   tempErrors.mail = "El correo electrónico no es válido.";
  //   isValid = false;
  // }

  if (!formData.mail.trim()) {
    tempErrors.mail = "El correo electrónico es requerido.";
    isValid = false;
  }else if (! /^[a-zA-Z0-9._-]+@unamba\.edu\.pe$/.test(formData.mail)) {
    tempErrors.mail = "El correo electrónico no es válido.";
    isValid = false;
  }


 
  if (!formData.concytec?.trim()) {
    tempErrors.concytec = "El código CONCYTEC es requerido.";
    isValid = false;
  } else if (!/^[A-Za-z0-9]{6,12}$/.test(formData.concytec)) {  
    tempErrors.concytec = "El código CONCYTEC debe ser alfanumérico y tener entre 6 y 12 caracteres.";
    isValid = false;
  }

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

  return { tempErrors, isValid };
};
