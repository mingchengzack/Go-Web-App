import axios from "axios";

// The connected endpoint
const endpoint = "http://localhost:8080";

// Axios instance
const api = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

const getAllTasks = () => api.get("/api/getAllTasks");
const insertTask = payload => api.post("/api/insertTask", payload);
const updateTask = (id, payload) => api.put("/api/updateTask/" + id, payload);
const deleteTask = id => api.delete("/api/deleteTask/" + id);
const deleteAllTasks = () => api.delete("/api/deleteAllTask");

// Exported apis
const apis = {
  getAllTasks,
  insertTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};

export default apis;
