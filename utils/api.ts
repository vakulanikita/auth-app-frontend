import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api"
    : "https://auth-app111.herokuapp.com/api";

export const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
