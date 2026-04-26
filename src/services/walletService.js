import axiosClient from "../api/axiosClient";

const voucherService = {
  myWallet: (id) => {
    return axiosClient.get(`/wallet/myWallet/${id}`);
  },
  deposit: () => {
    return axiosClient.get("/wallet/deposit");
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
};
export default voucherService;
