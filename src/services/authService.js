import axiosClient from "../api/axiosClient";

const authService = {
  signUp: (data) => {
    return axiosClient.post("/auth/signup", data);
  },
  signIn: (data) => {
    return axiosClient.post("/auth/signin", data);
  },
  signOut: () => {
    return axiosClient.post("/auth/signout");
  },
  refreshToken: () => {
    return axiosClient.post("/auth/refreshToken");
  },
  getMe: () => {
    return axiosClient.get("/auth/me");
  },
};
export default authService;
