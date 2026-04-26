import axiosClient from "../api/axiosClient";

const campusService = {
  getAllCampus: () => {
    return axiosClient.get("/campus/getAllCampus");
  },
  createCampus: (data) => {
    return axiosClient.post("/campus/createCampus", data);
  },
};

export default campusService;
