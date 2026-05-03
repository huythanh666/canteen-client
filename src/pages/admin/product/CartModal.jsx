// CartModal.jsx
import { useState } from "react";
import { useCart, useCartActions } from "../../../store/useCartStore";
import { useOrder } from "../../../hooks/useOrder";
import { formatOrderPayload } from "../../../utils/orderHelper";
import useAuthStore from "../../../store/useAuthStore";

function CartModal({ isOpen, onClose }) {
  const user = useAuthStore((state) => state.user);
  const cart = useCart();
  const { increment, decrement, removeItem } = useCartActions();
  const { createOrder, loading } = useOrder();
  const [formData, setFormData] = useState({
    userId: "",
    voucherId: "",
    paymentMethod: "CASH",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckout = async () => {
    if (!formData.userId.trim()) {
      alert("Vui lòng nhập Mã sinh viên/ID người dùng!");
      return;
    }
    try {
      const payload = formatOrderPayload(cart, {
        ...formData,
        canteenId: user.canteen_id,
      });
      await createOrder(payload);
      alert("Đặt hàng thành công!");
      onClose();
    } catch (err) {
      alert(err || "Có lỗi xảy ra!");
    }
  };
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-md p-6 flex flex-col max-h-[90vh] overflow-hidden border border-white/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">
            Giỏ hàng của bạn
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar min-h-[100px]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
              <p>Giỏ hàng đang trống!</p>
              <button
                onClick={onClose}
                className="mt-4 text-blue-600 font-bold"
              >
                Đi chọn món thôi
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 line-clamp-1">
                    {item.product_name}
                  </p>
                  <p className="text-xs font-semibold text-blue-600">
                    {item.price.toLocaleString()}đ
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-slate-200">
                  <button
                    onClick={() => decrement(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-slate-100 pt-6 mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Mã SV
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="Nhập mã..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Voucher
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Mã giảm giá..."
                  name="voucherId"
                  value={formData.voucherId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Phương thức thanh toán
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="CASH">Tiền mặt (CASH)</option>
                <option value="BANKING">Chuyển khoản (BANKING)</option>
                <option value="WALLET">Ví điện tử (WALLET)</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-500 font-medium">Tổng cộng</span>
              <span className="text-2xl font-black text-slate-900">
                {totalAmount.toLocaleString()}đ
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              Thanh toán ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default CartModal;
