import axios from "../store/axios";

export const checkValidity = (value, rules) => {
  let isValid = true;
  let messages = [];

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    if (!isValid) messages.push("Este campo es requerido.");
  }

  if (rules.min) {
    isValid = value >= rules.min && isValid;
    if (!isValid)
      messages.push(`Este número debe ser mayor o igual a ${rules.min}.`);
  }

  if (rules.max) {
    isValid = value <= rules.max && isValid;
    if (!isValid)
      messages.push(`Este número debe ser menor o igual a ${rules.max}.`);
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid)
      messages.push(
        `Este texto debe tener mínimo ${rules.minLength} caracteres.`
      );
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid)
      messages.push(
        `Este texto debe tener máximo ${rules.maxLength} caracteres.`
      );
  }

  return [isValid, messages];
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
};
