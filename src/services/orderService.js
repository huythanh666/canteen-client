import axiosClient from "../api/axiosClient";

const orderService = {
  historyOrder: () => {
    return axiosClient.get("/order/historyOrder");
  },
  myHistoryOrder: () => {
    return axiosClient.get("/order/my-history");
  },
  report: () => {
    return axiosClient.get("/order/report");
  },

  // done
  createOrder: (data) => {
    return axiosClient.post("/order/createOrder", data);
  },
  getOrderDetail: (id) => {
    return axiosClient.get(`/order/getOrderDetail/${id}`);
  },
  getAllOrder: (params) => {
    return axiosClient.get("/order/getAllOrder", { params });
  },
  updateOrder: (id, data) => {
    return axiosClient.put(`/order/updateOrder/${id}`, data);
  },
};
export default orderService;
