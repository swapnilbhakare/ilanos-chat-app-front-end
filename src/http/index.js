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
export const activate = (data) => api.post("users/activate", data);
export const logout = () => api.post("users/logout");
let isRefreshing = false;
let failedRequestsQueue = [];

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response.status === 401 &&
      !originalRequest._isRetry &&
      !isRefreshing
    ) {
      originalRequest._isRetry = true;

      try {
        isRefreshing = true;
        const { data } = await axios.get(`${api_url}users/refresh`, {
          withCredentials: true,
        });

        // Update the access token in localStorage or wherever you store it
        const newAccessToken = data.accessToken;

        // Retry failed requests with the new access token
        for (let request of failedRequestsQueue) {
          request.headers.Authorization = `Bearer ${newAccessToken}`;
          await axios(request);
        }

        // Clear the queue
        failedRequestsQueue = [];
        return api.request(originalRequest);
      } catch (error) {
        console.log("Error refreshing token:", error.message);
        // Handle token refresh error, e.g., log out the user
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);

export default api;
