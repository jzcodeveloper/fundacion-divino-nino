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

export const setAuthToken = token => {
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

export const getMinutes = ms => {
  const m = Math.ceil(ms / 1000 / 60);

  const mDisplay = m === 1 ? "min" : "mins";

  return `${m} ${mDisplay}`;
};

export const getGreetings = () => {
  const hours = new Date().getHours();

  if (hours < 12) return "Buenos días";
  if (hours >= 12 && hours < 19) return "Buenas tardes";
  if (hours >= 19) return "Buenas noches";
};

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const clearStorage = () => {
  const keys = Object.keys(localStorage);
  for (const key in keys) localStorage.removeItem(key);
};

export const lighten = (col, amt) => {
  let usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};
