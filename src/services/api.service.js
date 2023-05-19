import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

class ApiService {
    get(path) {
        return axios.get(API_URL + path);
    }

    post(path, payload) {
        return axios.post(API_URL + path, payload);
    }

    put(path, payload) {
        return axios.put(API_URL + path, payload);
    }

    delete(path) {
        return axios.delete(API_URL + path);
    }
}


export default new ApiService();