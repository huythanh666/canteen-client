import { useState } from "react";
import { useCartActions } from "../store/useCartStore";
import orderService from "../services/orderService";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCartActions();
  const createOrder = async (orderData) => {
    if (!orderData.user_id) throw new Error("Vui lòng nhập ID người dùng");
    if (!orderData.order_items.length) throw new Error("Giỏ hàng trống");
    try {
      setLoading(true);
      const response = await orderService.createOrder(orderData);
      clearCart();
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Đặt hàng thất bại";
    } finally {
      setLoading(false);
    }
  };
  return { createOrder, loading };
};
