import axiosClient from "../api/axiosClient";

const inventoryService = {
  getAllInventory: () => {
    return axiosClient.get("/inventory/getAllInventory");
  },
  getAllTransaction: () => {
    return axiosClient.get("/inventory/getAllTransaction");
  },
  createInventory: (data) => {
    return axiosClient.post("/inventory/createInventory", data);
  },
  createTransaction: (data) => {
    return axiosClient.post("/inventory/createTransaction", data);
  },
  getDetailInventory: (id) => {
    return axiosClient.get(`/inventory/getAllInventory/${id}`);
  },
  report: () => {
    return axiosClient.get("/inventory/report");
  },
};
export default inventoryService;
