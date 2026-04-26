import axiosClient from "../api/axiosClient";

const productService = {
  getAllProduct: () => {
    return axiosClient.get("/product/getAllProduct");
  },
  getDetailProductById: (id) => {
    return axiosClient.get(`/product/getDetailProductById/${id}`);
  },
  updateProduct: (id, data) => {
    return axiosClient.put(`/product/updateProduct/${id}`, data);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/product/deleteProduct/${id}`);
  },
  createProduct: (data) => {
    return axiosClient.post("/product/createProduct", data);
  },
  createProductRecipe: (data) => {
    return axiosClient.post("/product/createProductRecipe", data);
  },
};
export default productService;
