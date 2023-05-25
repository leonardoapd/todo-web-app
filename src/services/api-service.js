import axios from "axios";


const API_URL = "http://localhost:8085/api/v1/";

export function signup(data) {
    return axios.post(API_URL + "signup", data);
}

export function login(data) {
    // Login to the application and retrieve the JWT token from the header
    return axios.post(API_URL + "login", data).then(response => {
        const headers = response.headers;
        const bearerToken = headers.authorization;
        const token = bearerToken.replace('Bearer ', '');

        // Store the token in the local storage
        localStorage.setItem("token", token);

    });
}

export function logout() {
    // Logout from the application and remove the token from the local storage
    localStorage.removeItem("token");

    return axios.post(API_URL + "logout");
}

export function getUsers() { 
    return axios.get(API_URL + "users");
}