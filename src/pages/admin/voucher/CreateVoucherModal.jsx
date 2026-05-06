import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function CreateVoucherModal({ onClose }) {
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
        className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl"
      >
        <h2 className="text-xl font-black text-slate-800 mb-4">
          Tạo Voucher mới
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="code"
            placeholder="Mã Code"
            required
            className="col-span-2 p-3 border rounded-xl"
          />
          <input
            name="discount_value"
            type="number"
            placeholder="Giá trị giảm"
            required
            className="p-3 border rounded-xl"
          />
          <select name="discount_type" className="p-3 border rounded-xl">
            <option value="PERCENT">Phần trăm (%)</option>
            <option value="FIXED">Số tiền (đ)</option>
          </select>
          <input
            name="min_order_value"
            type="number"
            placeholder="Đơn tối thiểu"
            className="p-3 border rounded-xl"
          />
          <input
            name="max_discount"
            type="number"
            placeholder="Giảm tối đa"
            className="p-3 border rounded-xl"
          />
          <input
            name="usage_limit"
            type="number"
            placeholder="Giới hạn sử dụng"
            className="p-3 border rounded-xl"
          />
          <select name="is_active" className="p-3 border rounded-xl">
            <option value="true">Hoạt động</option>
            <option value="false">Tạm khóa</option>
          </select>
          <input
            name="start_date"
            type="datetime-local"
            className="p-3 border rounded-xl"
          />
          <input
            name="end_date"
            type="datetime-local"
            className="p-3 border rounded-xl"
          />
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
            {isSubmitting ? "Đang tạo..." : "Xác nhận"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
export default CreateVoucherModal;
