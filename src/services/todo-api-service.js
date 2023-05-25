import axios from "axios";

const API_URL = "http://localhost:8085/api/v1/";

export function getTodos() {
    // pass the data in the request body to the API
    return axios.get(API_URL + "todos");
}

export function completeTodo(id, checked) {
    // pass the data in the request body to the API
    return axios.post(API_URL + "todos/" + id, {
        done: checked
    });
}

export function editTodo(id, value) {
    // pass the data in the request body to the API
    return axios.put(API_URL + "todos/" + id, {
        todo: value
    });
}