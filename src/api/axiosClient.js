import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Thay bằng URL API của bạn
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // BẮT BUỘC: Để trình duyệt gửi kèm Cookie (refreshToken) lên server
});

// 1. INTERCEPTOR CHO REQUEST: Gắn AccessToken vào Header trước khi gửi đi
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

// Biến để quản lý trạng thái Refresh Token
let isRefreshing = false;
let failedQueue = [];

// Hàm để đẩy các request bị lỗi 401 vào hàng đợi (Queue)
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
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/refreshToken",
          {},
          { withCredentials: true },
        );

        const { accessToken, user } = res.data.data;
        useAuthStore.getState().actions.login(user, accessToken);
        axiosClient.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        useAuthStore.getState().actions.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
