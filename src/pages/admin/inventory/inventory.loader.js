import inventoryService from "../../../services/inventoryService";

export const inventoryList = async () => {
  return inventoryService.getAllInventory();
};
export const createTransactionAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "CREATE_IMPORT") {
    const payload = {
      inventory_id: formData.get("inventory_id"),
      staff_id: formData.get("staff_id"),
      quantity: Number(formData.get("quantity")),
      type: formData.get("type"),
      description: formData.get("description"),
    };

    await inventoryService.createTransaction(payload);
    return { success: true };
  }
  return null;
};
