import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

const handleResponse = (response) => {
  return response.data;
};

const handleError = (error) => {
  if (error.response) {
    return Promise.reject(error.response.data);
  } else if (error.request) {
    return Promise.reject(error.request);
  } else {
    return Promise.reject(error.message);
  }
};

export const getItems = () => {
  return axiosInstance.get("/").then(handleResponse).catch(handleError);
};

export const getItemById = (id) => {
  return axiosInstance.get(`/${id}`).then(handleResponse).catch(handleError);
};

export const createItem = (data) => {
  return axiosInstance.post("/", data).then(handleResponse).catch(handleError);
};

export const updateItem = (data) => {
  return axiosInstance
    .put(`/${data._id}`, data)
    .then(handleResponse)
    .catch(handleError);
};

export const deleteItem = (id) => {
  return axiosInstance.delete(`/${id}`).then(handleResponse).catch(handleError);
};

export const patchItem = (id, data) => {
  return axiosInstance.patch(`/items/${id}`, data).catch(handleError);
};

export const loginUser = (credentials) => {
  return axiosInstance
    .post("/auth/login", credentials)
    .then(handleResponse)
    .catch(handleError);
};

export const searchItems = (query) => {
  return axiosInstance
    .get(`/items/search`, { params: { q: query } })
    .then(handleResponse)
    .catch(handleError);
};
