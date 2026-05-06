import voucherService from "../../../services/voucherService";

export const voucherList = async () => {
  return await voucherService.getAllVoucher();
};
export const voucherAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "UPDATE_VOUCHER") {
    const id = formData.get("voucherId");
    try {
      await voucherService.updateVoucher(id);
      return { success: true, message: "Cập nhật thành công" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  const payload = {
    code: formData.get("code"),
    discount_value: parseFloat(formData.get("discount_value")),
    discount_type: formData.get("discount_type"),
    min_order_value: parseInt(formData.get("min_order_value")),
    max_discount: formData.get("max_discount")
      ? parseInt(formData.get("max_discount"))
      : null,
    start_date: new Date(formData.get("start_date")).toISOString(),
    end_date: new Date(formData.get("end_date")).toISOString(),
    usage_limit: parseInt(formData.get("usage_limit")),
    is_active: formData.get("is_active") === "true",
  };
  try {
    await voucherService.createVoucher(payload);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
