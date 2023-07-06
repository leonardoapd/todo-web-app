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

// // Interceptor to refresh the token
// export function responseInterceptor() {
//     axios.interceptors.request.use(
//         async (config) => {
//             // If the token has expired, we refresh it
//             if (isTokenExpired()) {
//                 const newToken = await renewToken();
//                 console.log("New token: ", newToken);
//                 localStorage.setItem("token", newToken);
//             } else {
//                 // If the token has not expired, we add it to the request
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     config.headers['Authorization'] = `Bearer ${token}`;
//                 }
//             }

//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );
// }
