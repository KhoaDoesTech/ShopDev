/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosResponse } from "axios";
import { getUserIdFromToken } from "../utils";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/v1/api/",
  // baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
});

const token = localStorage.getItem("accessToken");

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    if (token) {
      // config.headers.Authorization = token;
      config.headers["Content-Type"] = "application/json";
      config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
      // config.headers["x-client-id"] = getUserIdFromToken();
    } else {
      config.headers["Content-Type"] = "application/json";
      config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    const { data, status } = error.response || {};
    if (status === 401 || status === 403) {

      throw new Error("Unauthorized or Access Token is expired")
    }
    axiosClient.defaults.headers.common[
      "authorization"
    ] = localStorage.getItem("accessToken") || "";

    return Promise.reject(error);
  }
);

export default axiosClient;
