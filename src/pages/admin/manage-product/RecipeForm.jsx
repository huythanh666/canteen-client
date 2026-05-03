import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventoryService";
import productService from "../../../services/productService"; // Đảm bảo bạn đã import service này

function RecipeForm({ product, onClose }) {
  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    inventoryService.getAllInventory().then(setData);
  }, []);
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = {
      material_id: modalData.id,
      quantity: formData.get("quantity"),
      unit: formData.get("unit"),
    };
    setIngredients([...ingredients, newIngredient]);
    setModalData(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      product_id: product.id,
      recipes: ingredients,
    };
    try {
      await productService.createProductRecipe(payload);
      alert("Đã thêm công thức thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi lưu công thức.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-3xl w-full max-w-5xl shadow-2xl flex gap-8 h-[650px]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-1/2 border-r pr-8 flex flex-col">
          <h2 className="font-black text-xl text-slate-800 mb-2">
            Công thức cho: {product.product_name}
          </h2>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {ingredients.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center text-sm"
              >
                <span className="font-bold text-blue-900 truncate w-32">
                  ID: {item.material_id.slice(0, 8)}...
                </span>
                <span>
                  {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() =>
                    setIngredients(ingredients.filter((_, i) => i !== idx))
                  }
                  className="text-red-500 font-bold"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || ingredients.length === 0}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:bg-slate-300"
          >
            {loading ? "Đang lưu..." : "Lưu công thức hoàn chỉnh"}
          </button>
        </div>

        <div className="w-1/2 flex flex-col overflow-hidden">
          <h2 className="font-bold text-lg text-slate-800 mb-4">
            Chọn nguyên liệu
          </h2>
          <div className="flex-1 overflow-y-auto border rounded-xl shadow-sm">
            {data?.data?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr,100px,auto] gap-2 px-4 py-3 border-b items-center hover:bg-slate-50"
              >
                <span className="font-medium text-slate-700 truncate">
                  {item.inventory_name}
                </span>
                <span className="text-xs text-slate-500 truncate">
                  {item.canteen_name || "N/A"}
                </span>
                <button
                  onClick={() => setModalData(item)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalData && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
        >
          <form
            onSubmit={handleAddIngredient}
            className="bg-white p-6 rounded-3xl w-96 shadow-xl"
          >
            <h3 className="font-bold text-lg mb-4">
              Định lượng: {modalData.inventory_name}
            </h3>
            <div className="space-y-4">
              <input
                name="quantity"
                type="number"
                step="any"
                placeholder="Số lượng (0.05)"
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                name="unit"
                placeholder="Đơn vị (kg, g, ml...)"
                required
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="flex-1 p-3 bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 p-3 bg-blue-600 text-white rounded-xl"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RecipeForm;
