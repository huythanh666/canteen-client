// pages/admin/inventoryTransaction/inventoryTransaction.loader.js
import inventoryService from "../../../services/inventoryService";
export const inventoryTransactionList = async () => {
  return inventoryService.getAllTransaction();
};
