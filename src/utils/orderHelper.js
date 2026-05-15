export const formatOrderPayload = (cart, formData) => {
  return {
    user_id: formData.userId,
    canteen_id: formData.canteenId,
    user_sub_id: formData.userSubId || "",
    voucher_id: formData.voucherId || "",
    payment_method: formData.paymentMethod,
    sub_total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    discount: 0,
    order_items: cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
  };
};

export const formatOrderPayloadForCustomer = (cart, formData) => {
  return {
    user_id: formData.userId,
    canteen_id: formData.canteenId,
    user_sub_id: formData.userSubId || "",
    voucher_id: formData.voucherId || "",
    payment_method: formData.paymentMethod,
    sub_total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    discount: 0,
    order_items: cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
  };
};
