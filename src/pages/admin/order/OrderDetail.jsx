import { useState, useEffect } from "react";
import orderService from "../../../services/orderService";

function OrderDetailModal({ isOpen, onClose, orderId, discount }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen && orderId) {
      const fetchDetail = async () => {
        setLoading(true);
        try {
          const response = await orderService.getOrderDetail(orderId);
          if (response.success) setItems(response.data);
        } catch (error) {
          console.error("Lỗi:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, orderId]);
  const subTotal = items.reduce(
    (sum, item) => sum + Number(item.total_item_price),
    0,
  );
  const finalTotal = subTotal - discount;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-slate-50 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white">
        <div className="p-8 pb-4 flex justify-between items-start">
          <div>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Order Details
            </span>
            <h2 className="text-2xl font-black text-slate-800 mt-2">
              Thông Tin Món Ăn
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Mã đơn: #{orderId?.split("-")[0].toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white p-2 rounded-2xl shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-all text-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-8 py-4 max-h-[50vh] overflow-y-auto space-y-3 custom-scrollbar">
          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                      🍲
                    </div>
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-lg shadow-lg">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700">
                      {item.product_name}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold">
                      {Number(item.price_at_purchase).toLocaleString()}đ / món
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">
                    {Number(item.total_item_price).toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-8 pt-4">
          <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl shadow-slate-200">
            <div className="space-y-2 mb-4 border-b border-slate-700 pb-4">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Tạm tính</span>
                <span>{subTotal.toLocaleString()}đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-rose-400">
                  <span>Giảm giá</span>
                  <span>-{discount.toLocaleString()}đ</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-200 font-bold">Tổng thanh toán</span>
              <span className="text-2xl font-black text-blue-400">
                {finalTotal.toLocaleString()}đ
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/30"
            >
              Hoàn tất kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
