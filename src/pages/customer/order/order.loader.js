import orderService from "../../../services/orderService";

export const orderHistoryLoader = async () => {
  return await orderService.myHistoryOrder();
};
