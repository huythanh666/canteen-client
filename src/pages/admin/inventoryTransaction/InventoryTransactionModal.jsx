import { useState, useEffect } from "react";
import inventoryService from "../../../services/inventoryService";

function InventoryTransactionModal({ isOpen, onClose, transactionId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && transactionId) {
      const fetchDetail = async () => {
        setLoading(true);
        try {
          const response =
            await inventoryService.createTransaction(transactionId);
          setData(response.data);
        } catch (error) {
          console.error("Lỗi khi tải chi tiết:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, transactionId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 flex flex-col max-h-[90vh] overflow-hidden border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">
            Chi tiết giao dịch
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="text-center py-10 text-slate-400">Đang tải...</div>
          ) : data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Mã đơn
                  </p>
                  <p className="font-bold text-slate-800">#{data.id}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Loại
                  </p>
                  <p
                    className={`font-bold ${data.type === "IMPORT" ? "text-emerald-600" : "text-blue-600"}`}
                  >
                    {data.type === "IMPORT" ? "NHẬP HÀNG" : "XUẤT HÀNG"}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Sản phẩm
                </p>
                {data.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 border border-slate-100 rounded-xl"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-400">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <p className="font-bold text-slate-700">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400">
              Không tìm thấy dữ liệu.
            </p>
          )}
        </div>
        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryTransactionModal;
