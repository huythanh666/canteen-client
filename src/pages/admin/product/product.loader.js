import productService from "../../../services/productService";

export const productList = async () => {
  return await productService.getAllProduct();
};
