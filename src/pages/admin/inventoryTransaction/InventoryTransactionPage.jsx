import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import InventoryTransactionModal from "./InventoryTransactionModal";

function InventoryTransactionPage() {
  const loader = useLoaderData();
  const [filterType, setFilterType] = useState("ALL");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredList = loader.data.filter((item) =>
    filterType === "ALL" ? true : item.type === filterType,
  );

  const handleOpenDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-slate-50">
      <div className="flex-none flex justify-between items-center mb-6">
        <h1 className="font-black text-2xl text-slate-800 border-l-4 border-blue-600 pl-4">
          Lịch sử Xuất - Nhập
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">
            Lọc theo loại:
          </span>
          <select
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">Tất cả</option>
            <option value="IMPORT">Nhập hàng</option>
            <option value="EXPORT">Xuất hàng</option>
          </select>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-3xl shadow-sm border border-slate-100 p-2">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-slate-400 uppercase bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Mã đơn</th>
              <th className="px-6 py-4">Tên hàng</th>
              <th className="px-6 py-4">Nhân viên</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 text-xs">
                  #{item.order_id?.split("-")[0].toUpperCase()}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-700">
                  {item.inventory_name}
                </td>
                <td className="px-6 py-4 text-slate-500">{item.staff_name}</td>
                <td className="px-6 py-4 font-bold text-slate-800">
                  {item.quantity}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      item.type === "IMPORT"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.type === "IMPORT" ? "NHẬP HÀNG" : "XUẤT HÀNG"}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">
                  {new Date(item.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleOpenDetail(item.order_id)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all font-bold text-slate-600 text-xs"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InventoryTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={selectedOrderId}
      />
    </div>
  );
}

export default InventoryTransactionPage;
