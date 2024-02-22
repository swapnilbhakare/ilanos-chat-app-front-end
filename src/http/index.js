import axios from "axios";
import { api_url } from "../utils/constant";

const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("users/send-otp", data);
export const verifyOtp = (data) => api.post("users/verify-otp", data);
export const activate = (data) => api.post("/users/activate", data);

export default api;
