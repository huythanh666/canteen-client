import axiosClient from "../api/axiosClient";

const canteenService = {
  getAllCanteen: () => {
    return axiosClient.get("/canteen/getAllCanteen");
  },
  createCanteen: (data) => {
    return axiosClient.post("/canteen/createCanteen", data);
  },
};

export default canteenService;
