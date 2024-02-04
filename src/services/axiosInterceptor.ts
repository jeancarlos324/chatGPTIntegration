import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.openai.com/v1/chat/completions";

export const axiosInstanceGPT: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthorizationHeaderGPT = (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${API_KEY}`;
  }
};

export const axiosInterceptor = () => {
  axiosInstanceGPT.interceptors.request.use((req) => {
    setAuthorizationHeaderGPT(req);
    return req;
  });
  axiosInstanceGPT.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const { response } = err;
      if (!response) {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  );
};
