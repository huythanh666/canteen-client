import productService from "../../../services/productService";

export const menuLoader = async () => {
  return await productService.getAllProduct();
};
