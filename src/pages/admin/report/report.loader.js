import inventoryService from "../../../services/inventoryService";
import orderService from "../../../services/orderService";
import walletService from "../../../services/walletService";

export const reportData = async () => {
  const inventoryReport = await inventoryService.report();
  const inventoryTransactionReport =
    await inventoryService.reportInventoryTransaction();
  const walletReport = await walletService.report();
  const orderReport = await orderService.report();
  return {
    inventoryReport,
    inventoryTransactionReport,
    walletReport,
    orderReport,
  };
};
