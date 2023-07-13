import axios from "axios";
import { isTokenExpired } from "../services/token-service";
// import { renewToken } from '../services/http-client-service'

export function authInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
