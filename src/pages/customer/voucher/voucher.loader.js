import voucherService from "../../../services/voucherService";

export const voucherLoader = async () => {
  const [allVouchers, myVouchers] = await Promise.all([
    voucherService.getAllVoucher(),
    voucherService.getMyVoucher(),
  ]);

  return {
    allVouchers: allVouchers,
    myVouchers: myVouchers,
  };
};

export const saveVoucherAction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("voucherId");

  try {
    const response = await voucherService.saveVoucher(id);
    return { success: true, message: "Lưu voucher thành công!" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Bạn đã lưu voucher này rồi!",
    };
  }
};
