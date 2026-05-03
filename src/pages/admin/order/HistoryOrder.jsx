import { useLoaderData } from "react-router-dom";
import OrderDetailModal from "./OrderDetail";
import { useState } from "react";

function HistoryOrderPage() {
  const loader = useLoaderData();
  const orders = loader?.data || [];
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // 3. Hàm xử lý khi nhấn "Xem chi tiết"
  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-800 mb-6">
        Lịch sử đơn hàng
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4">Mã đơn hàng</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Nhân viên</th>
                <th className="px-6 py-4">Ngày đặt</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {order.customer_name || "Khách vãng lai"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {order.staff_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {Number(order.final_price || 0).toLocaleString("vi-VN")}đ
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetail(order.id)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    Không có đơn hàng nào được tìm thấy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <OrderDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            orderId={selectedOrderId}
            discount={0}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryOrderPage;
