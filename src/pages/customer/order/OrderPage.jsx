import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import OrderDetailModal from "../../admin/order/OrderDetail";

const getStatusBadge = (status) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
          Chờ duyệt
        </span>
      );
    case "COMPLETED":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
          Hoàn thành
        </span>
      );
    case "CANCELLED":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">
          Đã hủy
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
          {status}
        </span>
      );
  }
};

function OrderPage() {
  const orders = useLoaderData();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  if (!orders?.data || orders.data.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        <p>Bạn chưa có đơn hàng nào.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="flex-none text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-400 pl-3">
        Lịch sử đặt món
      </h1>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {orders?.data?.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Đơn hàng #{order.id.slice(-6)}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-blue-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.final_price)}
                </span>

                <button
                  onClick={() => handleOpenDetail(order)}
                  className="text-xs font-bold text-gray-500 hover:text-blue-600 transition"
                >
                  Xem chi tiết →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderId={selectedOrder.id}
          discount={selectedOrder.discount || 0}
        />
      )}
    </div>
  );
}

export default OrderPage;
