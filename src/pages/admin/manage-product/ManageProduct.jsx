import { useFetcher, useLoaderData } from "react-router-dom";
import CreateProductForm from "./CreateProductForm";
import { useState } from "react";
import RecipeForm from "./RecipeForm";

function ManageProduct() {
  const loader = useLoaderData();
  const fetcher = useFetcher();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const data =
    loader?.data?.filter(
      (e) => e.is_selling === false || e.is_available === false,
    ) || [];
  const handleOpenSale = (productId) => {
    const formData = new FormData();
    formData.append("intent", "OPEN_SALE");
    formData.append("product_id", productId);
    fetcher.submit(formData, { method: "put" });
  };

  return (
    <div className="h-[91vh] p-6 bg-slate-50 overflow-hidden flex flex-col">
      <h1 className="font-black text-2xl text-slate-800 mb-6 flex-none">
        Quản lý sản phẩm
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start overflow-y-auto pb-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Thêm sản phẩm mới
          </h2>
          <CreateProductForm />
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Sản phẩm cần kiểm tra ({data.length})
          </h2>
          <div className="space-y-3">
            {data.length === 0 ? (
              <div className="text-slate-400 text-sm italic py-4 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                Không có sản phẩm nào ngừng bán hoặc hết hàng.
              </div>
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">
                        {item.product_name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {item.price?.toLocaleString()}đ / {item.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => setSelectedProduct(item)}
                      className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Thêm công thức
                    </button>
                    <button
                      onClick={() => handleOpenSale(item.id)}
                      disabled={fetcher.state === "submitting"}
                      className="bg-green-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {fetcher.state === "submitting"
                        ? "Đang xử lý..."
                        : "Mở bán"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {selectedProduct && (
            <RecipeForm
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default ManageProduct;
