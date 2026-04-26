import axiosClient from "../api/axiosClient";

const voucherService = {
  getAllVoucher: () => {
    return axiosClient.get("/voucher/getAllVoucher");
  },
  getVoucherDetail: (id) => {
    return axiosClient.get(`/voucher/getVoucherDetail${id}`);
  },
  saveVoucher: (id) => {
    return axiosClient.post(`/voucher/saveVoucher${id}`);
  },
  getMyVoucher: () => {
    return axiosClient.get("/voucher/getMyVoucher");
  },
  createVoucher: (data) => {
    return axiosClient.post("/voucher/createVoucher", data);
  },
  updateVoucher: (id, data) => {
    return axiosClient.put(`/voucher/updateVoucher${id}`, data);
  },
};
export default voucherService;
