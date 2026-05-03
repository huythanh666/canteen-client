import axiosClient from "../api/axiosClient";

const productService = {
  getDetailProductById: (id) => {
    return axiosClient.get(`/product/getDetailProductById/${id}`);
  },
  updateProduct: (id) => {
    return axiosClient.put(`/product/updateProduct/${id}`);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/product/deleteProduct/${id}`);
  },
  createProduct: (formData) => {
    console.log(formData);
    return axiosClient.post("/product/createProduct", formData);
  },
  createProductRecipe: (data) => {
    return axiosClient.post("/product/createProductRecipe", data);
  },
  //done
  getAllProduct: () => {
    return axiosClient.get("/product/getAllProduct");
  },
};
export default productService;
