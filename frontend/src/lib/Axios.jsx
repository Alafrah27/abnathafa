import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://abnathafa.onrender.com/api`,
  withCredentials: true,
});
