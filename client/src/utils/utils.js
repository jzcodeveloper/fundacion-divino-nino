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

export const date = (date, format) => {
  const d = new Date(date);

  let month = "" + (d.getUTCMonth() + 1);
  let day = "" + d.getUTCDate();
  let year = "" + d.getUTCFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (year.length < 2) year = "000" + year;
  if (year.length < 3) year = "00" + year;
  if (year.length < 4) year = "0" + year;

  format = format.replace("yyyy", year);
  format = format.replace("mm", month);
  format = format.replace("dd", day);

  return format;
};

export const time = (date, format) => {
  const d = new Date(date);

  let hours = "" + d.getHours();
  let minutes = "" + d.getMinutes();

  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;

  format = format.replace("hh", hours);
  format = format.replace("mm", minutes);

  return format;
};

export const timeSince = (date, verbose) => {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return verbose ? `Hace ${interval} años` : interval + " y";

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return verbose ? `Hace ${interval} meses` : interval + " m";

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return verbose ? `Hace ${interval} días` : interval + " d";

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return verbose ? `Hace ${interval} horas` : interval + " h";

  interval = Math.floor(seconds / 60);
  if (interval > 1)
    return verbose ? `Hace ${interval} minutos` : interval + " m";

  return verbose ? `Hace ${Math.floor(seconds)} segundos` : interval + " s";
};
