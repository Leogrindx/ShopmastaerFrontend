import axios from "axios";

export const API_URL =
  "https://jgd1ilwo12.execute-api.eu-north-1.amazonaws.com/api";
// const localhost = "http://localhost/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
