import axiosClient from "../api/axiosClient";

const inventoryService = {
  getAllInventory: () => {
    return axiosClient.get("/inventory/getAllInventory");
  },
  getAllTransaction: () => {
    return axiosClient.get("/inventory/getAllTransaction");
  },
  createTransaction: (data) => {
    return axiosClient.post("/inventory/createTransaction", data);
  },
  getDetailInventory: (id) => {
    return axiosClient.get(`/inventory/getDetailInventory/${id}`);
  },
  createInventory: (data) => {
    return axiosClient.post("/inventory/createInventory", data);
  },
  // chưa làm
  reportInventoryTransaction: () => {
    return axiosClient.get("/inventory/reportInventoryTransaction");
  },
  report: () => {
    return axiosClient.get("/inventory/report");
  },
};
export default inventoryService;
