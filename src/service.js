import axios from "axios";

export const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  return axios
    .get(process.env.REACT_APP_BASEURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
    .then(handleResponse)
    .catch(handleError);
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

export const deleteItem = (id, googleCalendarEventId) => {
  return axiosInstance
    .delete(`/${id}?googleCalendarEventId=${googleCalendarEventId}`)
    .then(handleResponse)
    .catch(handleError);
};

export const patchItem = (id, data) => {
  return axiosInstance.patch(`/items/${id}`, data).catch(handleError);
};

export const loginUser = () => {
  window.location.href =
    "https://tutor-calendar-backend.onrender.com/auth/google";
};

export const searchItems = (query) => {
  return axiosInstance
    .get(`/items/search`, { params: { q: query } })
    .then(handleResponse)
    .catch(handleError);
};

export const logout = () => {
  localStorage.removeItem("token");
};
