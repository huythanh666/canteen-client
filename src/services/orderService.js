import axiosClient from "../api/axiosClient";

const orderService = {
  createOrder: (data) => {
    return axiosClient.post("/order/createOrder", data);
  },
  history: () => {
    return axiosClient.get("/order/history");
  },
  getOrderDetail: (id) => {
    return axiosClient.get(`/order/getOrderDetail/${id}`);
  },
  getAllOrder: () => {
    return axiosClient.get("/order/getAllOrder");
  },
  updateOrder: (id) => {
    return axiosClient.put(`/order/updateOrder/${id}`);
  },
  report: () => {
    return axiosClient.get("/order/report");
  },
};
export default orderService;
