import axiosClient from "../api/axiosClient";

const userService = {
  getListUser: () => {
    return axiosClient.get("/user/getListUser");
  },
  getUserById: (id) => {
    return axiosClient.get(`/user/getUserById/${id}`);
  },
  deleteUserById: (id) => {
    return axiosClient.delete(`/user/deleteUserById/${id}`);
  },
  updateUserById: (id, data) => {
    return axiosClient.put(`/user/updateUserById/${id}`, data);
  },
};
export default userService;
