import walletService from "../../../services/walletService";

export const walletLoader = async () => {
  return await walletService.myWallet();
};
