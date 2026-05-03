import orderService from "../../../services/orderService";
import { handleLoader } from "../../../utils/loaderHanler";

// routes/order.js
export const orderList = handleLoader((params) => {
  const query = {
    status: params.status || "PENDING",
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 8,
  };
  return orderService.getAllOrder(query);
});

export const updateOrderAction = async ({ request }) => {
  const formData = await request.formData();
  const orderId = formData.get("orderId");
  const nextStatus = formData.get("nextStatus");

  try {
    await orderService.updateOrder(orderId, { status: nextStatus });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const historyOrderList = async () => {
  return orderService.historyOrder();
};
