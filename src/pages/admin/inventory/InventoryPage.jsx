import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import ImportModal from "./ImportModal";
import InventoryDetailModal from "./InventoryDetailModal";

function InventoryPage() {
  const { data } = useLoaderData();
  const user = useAuthStore((state) => state.user);

  const uniqueCanteens = [
    ...new Map(
      data.map((item) => [item.canteen_id, item.canteen_name]),
    ).entries(),
  ];
  const [selectedCanteenId, setSelectedCanteenId] = useState("all");
  const filteredList =
    selectedCanteenId === "all"
      ? data
      : data.filter((item) => item.canteen_id === selectedCanteenId);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenImport = (item) => {
    setSelectedProduct({
      inventory_id: item.id,
      inventory_name: item.inventory_name,
    });
    setIsImportModalOpen(true);
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState(null);

  const handleOpenDetail = (item) => {
    setSelectedDetailId(item.id);
    setIsDetailModalOpen(true);
  };
  return (
    <div className="h-full flex flex-col p-6 bg-slate-50">
      <div className="flex-none flex justify-between items-center mb-6">
        <h1 className="font-black text-2xl text-slate-800 border-l-4 border-blue-600 pl-4">
          Quản lý kho hàng
        </h1>

        {user?.role === "SUPER_ADMIN" && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">
              Lọc theo:
            </span>
            <select
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
              value={selectedCanteenId}
              onChange={(e) => setSelectedCanteenId(e.target.value)}
            >
              <option value="all">Tất cả Canteen</option>
              {uniqueCanteens.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-2">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-slate-400 uppercase bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Tên hàng</th>
              <th className="px-6 py-4">Kho</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Đơn vị</th>
              <th className="px-6 py-4">Giá vốn</th>
              <th className="px-6 py-4">Min Stock</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {item.inventory_name}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">
                  {item.canteen_name}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-lg font-bold ${
                      Number(item.quantity) <= Number(item.min_stock)
                        ? "bg-red-100 text-red-600 ring-1 ring-red-200"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {item.quantity}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                <td className="px-6 py-4 font-semibold text-slate-700">
                  {Number(item.cost_price).toLocaleString()}đ
                </td>
                <td className="px-6 py-4 text-slate-400 font-medium">
                  {item.min_stock}
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleOpenDetail(item)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleOpenImport(item)}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl font-bold text-xs"
                  >
                    Nhập hàng
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        selectedProduct={selectedProduct} // Truyền sản phẩm đã chọn
        staffId={user?.id} // Lấy từ store
      />
      <InventoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        inventoryId={selectedDetailId}
      />
    </div>
  );
}

export default InventoryPage;
