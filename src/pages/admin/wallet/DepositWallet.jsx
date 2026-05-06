import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function DepositModal({ wallet, onClose }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data?.success) {
      onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <fetcher.Form
        method="post"
        className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
      >
        <h2 className="text-xl font-black mb-4">Nạp tiền vào ví</h2>

        <input type="hidden" name="intent" value="DEPOSIT" />
        <input type="hidden" name="wallet_id" value={wallet.id} />
        <input type="hidden" name="type" value="TOPUP" />
        <input type="hidden" name="description" value="Nạp tiền" />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Khách hàng
            </label>
            <input
              disabled
              value={wallet.user.name}
              className="w-full p-3 bg-slate-50 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Số tiền nạp (VNĐ)
            </label>
            <input
              name="amount"
              type="number"
              required
              placeholder="Nhập số tiền..."
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-3 bg-slate-100 rounded-xl font-bold"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 p-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            {isSubmitting ? "Đang nạp..." : "Xác nhận"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
export default DepositModal;
