import axios from "axios";
import { extractEmailFromToken } from "./token-service";

// const API_URL = "http://localhost:8085/api/v1/";
const API_URL = "http://localhost:5053/api/";

export async function getTodos() {
  // pass the data in the request body to the API
  return await axios.get(API_URL + "todo/" + extractEmailFromToken());
}

export function addTodo(value) {
  // pass the data in the request body to the API
  return axios.post(API_URL + "todo", {
    title: value,
    isCompleted: false,
    userEmail: extractEmailFromToken(),
  });
}

export function completeTodo(id, checked) {
  // pass the data in the request body to the API
  return axios.post(API_URL + "todo/" + id, {
    isCompleted: checked,
  });
}

export function editTodo(id, value) {
  // pass the data in the request body to the API
  return axios.put(API_URL + "todo/" + id, {
    title: value,
  });
}

export function deleteTodo(id) {
  // pass the data in the request body to the API
  return axios.delete(API_URL + "todo/" + id);
}
