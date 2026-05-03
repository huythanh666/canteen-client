import { useState, useEffect } from "react";
import inventoryService from "../../../services/inventoryService";

function InventoryDetailModal({ isOpen, onClose, inventoryId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen && inventoryId) {
      const fetchDetail = async () => {
        setLoading(true);
        try {
          const response =
            await inventoryService.getDetailInventory(inventoryId);
          setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Lỗi khi tải chi tiết:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, inventoryId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">
            Lịch sử giao dịch
          </h2>
        </div>

        <div className="p-0 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-10 text-slate-400">
              Đang tải dữ liệu...
            </div>
          ) : data.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Loại</th>
                  <th className="px-4 py-3">Nhân viên</th>
                  <th className="px-4 py-3">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          item.type === "IMPORT"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium">
                      {item.staff_name}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {item.description || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-slate-400">
              Không có dữ liệu nào.
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100">
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

export default InventoryDetailModal;
