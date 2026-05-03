import { useLoaderData, useSearchParams } from "react-router-dom";
import CardOrderStatus from "./CardOrderStatus";
import OrderItem from "./OrderItem";
import { useState } from "react";
import OrderDetailModal from "./OrderDetail";

function OrderPage() {
  const order = useLoaderData();
  const statisticsArray = Object.entries(order.statistics);
  const { totalPages, currentPage } = order.pagination;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "PENDING";
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ status: currentStatus, page: newPage });
    }
  };
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const openDetail = ({ id, discount }) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
    setIsDiscount(discount);
  };

  return (
    <div className="h-full p-6 flex flex-col overflow-hidden">
      <div className="flex-none grid grid-cols-4 gap-5 mb-6">
        {statisticsArray.map(([status, count]) => (
          <CardOrderStatus key={status} status={status} count={count} />
        ))}
      </div>
      <h1 className="flex-none mb-5 font-bold text-xl uppercase text-gray-700 border-l-4 border-blue-400 pl-3">
        {currentStatus} LIST
      </h1>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-4 gap-5 w-full items-start">
          {order.orderList.map((item) => (
            <OrderItem
              key={item.id}
              detail={item}
              onViewDetail={() => openDetail(item)}
            />
          ))}
        </div>
      </div>
      <OrderDetailModal
        discount={isDiscount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={selectedOrderId}
      />
      <div className="flex-none flex justify-center items-center py-2 border-t border-gray-100">
        <nav className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md border transition-colors ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default OrderPage;
