import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export const api = {
  get(url: string, params: Record<string, any>) {
    return axiosInstance.get(url, { params });
  },
};
