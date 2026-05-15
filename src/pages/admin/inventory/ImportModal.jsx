import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

function ImportModal({ isOpen, onClose, selectedProduct, staffId }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data?.success && !isSubmitting) {
      onClose();
    }
  }, [fetcher.data, isSubmitting, onClose]);

  if (!isOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <fetcher.Form
        method="post"
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
      >
        <h2 className="text-xl font-black text-slate-800 mb-6">Nhập hàng</h2>

        <input type="hidden" name="intent" value="CREATE_IMPORT" />
        <input type="hidden" name="type" value="IMPORT" />
        <input type="hidden" name="staff_id" value={staffId} />
        <input
          type="hidden"
          name="inventory_id"
          value={selectedProduct.inventory_id}
        />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Sản phẩm
            </label>
            <input
              type="text"
              disabled
              value={selectedProduct.inventory_name}
              className="w-full p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 font-bold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              required
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Mô tả
            </label>
            <textarea
              name="description"
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
              rows="3"
              placeholder="Nhập ghi chú..."
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold"
          >
            {isSubmitting ? "Đang xử lý..." : "Xác nhận Nhập"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default ImportModal;
