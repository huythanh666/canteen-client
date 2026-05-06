import walletService from "../../../services/walletService";

export const walletList = async () => {
  return await walletService.getAllWallet();
};

export const walletTransactionList = async () => {
  return await walletService.getAllTransaction();
};
export const walletAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "DEPOSIT") {
    const payload = {
      wallet_id: formData.get("wallet_id"),
      amount: Number(formData.get("amount")),
      type: formData.get("type"),
      description: formData.get("description"),
    };
    try {
      await walletService.deposit(payload);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return null;
};
