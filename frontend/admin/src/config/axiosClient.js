import axios from "axios";
import { getUserIdFromToken } from "../utils";
const token = localStorage.getItem("accessToken");
const axiosClient = axios.create({
    baseURL: "http://localhost:3000/v1/api/",
    // withCredentials: true,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
axiosClient.interceptors.request.use((config) => {
  if(token != null){
    config.headers = {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": import.meta.env.VITE_API_KEY,
      "authorization" : localStorage.getItem("accessToken") || "",
      "x-client-id": getUserIdFromToken()
    };
  } else {
    config.headers = {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": import.meta.env.VITE_API_KEY,
    };
  }
  return config;


});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    config.headers = {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": import.meta.env.VITE_API_KEY,
      authorization: localStorage.getItem("accessToken") || "",
      "x-client-id": getUserIdFromToken(),
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;