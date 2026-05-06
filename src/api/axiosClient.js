import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (useAuthStore.getState().isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        });
      }
      originalRequest._retry = true;
      useAuthStore.getState().actions.setRefreshing(true);

      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/refreshToken",
          {},
          { withCredentials: true },
        );

        const { accessToken, user } = res.data.data;
        useAuthStore.getState().actions.login(user, accessToken);

        useAuthStore.getState().actions.setRefreshing(false);
        processQueue(null, accessToken);

        return axiosClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().actions.setRefreshing(false);
        useAuthStore.getState().actions.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
