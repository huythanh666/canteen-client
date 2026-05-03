import { useCartActions } from "../../../store/useCartStore";

function CardProduct({ product }) {
  const { addToCart } = useCartActions();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div
      key={product.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all flex flex-col"
    >
      <div className="relative h-40 mb-3 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.product_name}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded-full ${product.is_selling ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
        >
          {product.is_selling ? "ĐANG BÁN" : "NGỪNG BÁN"}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 h-10 mb-2">
          {product.product_name}
        </h3>
        <p className="text-xs text-gray-500 mb-1">Loại: {product.category}</p>
        <p className="text-xs text-gray-500">Đơn vị: {product.unit}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="font-black text-rose-500 text-base">
          {formatCurrency(product.price)}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-bold text-gray-600 transition-colors"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
