import axios from "axios";
import { isTokenExpired } from "./token-service";

// const API_URL = "http://localhost:8085/api/v1/";
const API_URL = "http://localhost:5053/api/auth/";

const errorMessages = {
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  500: "Internal server error",
  503: "Service unavailable",
  504: "Gateway timeout",
};

const errorHandler = (error) => {
  if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 401 || statusCode === 403) {
      logout();
    }

    if (statusCode in errorMessages) {
      console.log(errorMessages[statusCode]);
    }
  } else if (error.request) {
    console.log("Error 404: Resource not found");
  } else {
    console.log("Error", error.message);
  }
};

export function signup(data) {
  return axios.post(API_URL + "signup", data);
}

export function login(data) {
  // if (isTokenExpired()) {
  //     logout();
  // }

  return axios
    .post(API_URL + "signin", data)
    .then((response) => {
      const headers = response.headers;
      const bearerToken = headers.authorization;
      const token = bearerToken.replace("Bearer ", "");
      localStorage.setItem("token", token);
    })
    .catch((error) => {
      errorHandler(error);
      // console.log(error);
    });
}
// export async function renewToken() {
//     console.log("Renewing token");
//     const response = await axios.post(API_URL + "renovateToken");

//     return response.hearders.authorization;
// }

export function logout() {
  localStorage.removeItem("token");
  return axios.get(API_URL + "logout").catch((error) => {
    errorHandler(error);
  });
}

export function getUsers() {
  return axios.get(API_URL + "users");
}
