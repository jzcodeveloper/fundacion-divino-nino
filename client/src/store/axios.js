import axios from "axios";

const axiosInstance = axios.create({
  /* baseURL: "http://localhost:5000/api", */
  baseURL: "https://ml-crowdsourcing-platform.herokuapp.com/api",
});

export default axiosInstance;
