import axios from "../store/axios";

export const checkValidity = (value, rules) => {
  let isValid = true;
  let messages = [];

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    if (!isValid) messages.push(rules.required[1]);
  }

  if (rules.min) {
    isValid = value >= rules.min[0] && isValid;
    if (!isValid) messages.push(rules.min[1]);
  }

  if (rules.max) {
    isValid = value <= rules.max[0] && isValid;
    if (!isValid) messages.push(rules.max[1]);
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength[0] && isValid;
    if (!isValid) messages.push(rules.minLength[1]);
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength[0] && isValid;
    if (!isValid) messages.push(rules.maxLength[1]);
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

export const formatDate = (date, ch) => {
  const d = new Date(date);
  let month = "" + (d.getUTCMonth() + 1);
  let day = "" + d.getUTCDate();
  let year = d.getUTCFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join(ch ? ch : "-");
};

export const getMinutes = (ms) => {
  const m = Math.ceil(ms / 1000 / 60);

  const mDisplay = m === 1 ? "min" : "mins";

  return `${m} ${mDisplay}`;
};
