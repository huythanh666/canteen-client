import axiosClient from "../api/axiosClient";

const productReviewService = {
  createReview: (data) => {
    return axiosClient.post("/review/createReview", data);
  },
  getAllReview: (id) => {
    return axiosClient.get(`/review/getAllReview/${id}`);
  },
};
export default productReviewService;
