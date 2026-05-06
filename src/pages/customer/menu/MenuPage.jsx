// MenuPage.jsx
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../../store/useCartStore";
import CartModal from "../../admin/product/CartModal";
import CardProduct from "../../admin/product/CardProduct";

function MenuPage() {
  const products = useLoaderData();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const availableProducts = products.data.filter((p) => p.is_selling);

  return (
    <div className="h-full p-6 flex flex-col overflow-hidden bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl uppercase text-gray-700 border-l-4 border-blue-400 pl-3">
          Thực đơn hôm nay
        </h1>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
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
              strokeWidth="2.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Giỏ hàng</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Grid hiển thị sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto pr-2">
        {availableProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Modal giỏ hàng */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default MenuPage;
