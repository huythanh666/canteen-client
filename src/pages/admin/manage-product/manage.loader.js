// manage.loader.js
import productService from "../../../services/productService";

export const productAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "CREATE_PRODUCT") {
    await productService.createProduct(formData);
    return { success: true };
  }
  if (intent === "OPEN_SALE") {
    const id = formData.get("product_id");
    try {
      await productService.updateProduct(id);
      return { success: true };
    } catch (error) {
      return { error: "Không thể cập nhật sản phẩm" };
    }
  }

  return null;
};
