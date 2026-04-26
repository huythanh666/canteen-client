import axiosClient from "../api/axiosClient";

const reviewCommentService = {
  createComment: (data) => {
    return axiosClient.post("/comment/createComment", data);
  },
  getAllComment: (id) => {
    return axiosClient.get(`/comment/getAllComment/${id}`);
  },
};
export default reviewCommentService;
