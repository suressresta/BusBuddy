import axios from "axios";

const baseAxios = axios.create();

// Backend URl
baseAxios.defaults.baseURL = "http://localhost:8080";

// Add a request interceptor
baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
baseAxios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      console.log("Data loaded successfully");
    } else if (response.status === 201) {
      console.log("Data created successfully");
    }
    return response.data;
  },
  (error) => {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message;

    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Logging out...");
      // Perform actions like logging out user or redirecting to login page
    }

    return Promise.reject(errorMessage);
  }
);

export default baseAxios;
