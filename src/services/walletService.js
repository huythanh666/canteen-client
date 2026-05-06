import axiosClient from "../api/axiosClient";

const walletService = {
  myWallet: () => {
    return axiosClient.get("/wallet/myWallet");
  },
  deposit: (data) => {
    return axiosClient.post("/wallet/deposit", data);
  },
  getAllTransaction: () => {
    return axiosClient.get("/wallet/getAllTransaction");
  },
  getAllWallet: () => {
    return axiosClient.get("/wallet/getAllWallet");
  },
  refund: (id) => {
    return axiosClient.get(`/wallet/refund${id}`);
  },
  report: () => {
    return axiosClient.get("/wallet/report");
  },
};
export default walletService;
