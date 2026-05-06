import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import CreateVoucherModal from "./CreateVoucherModal";

function VoucherPage() {
  const vouchers = useLoaderData() || { data: [] };
  const fetcher = useFetcher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getStatusStyle = (status) => {
    return status === true
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };
  const handleUpdate = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?"))
      return;
    const formData = new FormData();
    formData.append("intent", "UPDATE_VOUCHER");
    formData.append("voucherId", id);
    fetcher.submit(formData, { method: "post" });
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="font-black text-2xl text-slate-800 mb-6">
        Quản lý Voucher
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold"
      >
        + Tạo Voucher mới
      </button>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Mã Voucher</th>
              <th className="px-6 py-4">Loại giảm</th>
              <th className="px-6 py-4">Giá trị giảm</th>
              <th className="px-6 py-4">Đơn tối thiểu</th>
              <th className="px-6 py-4">Tối đa giảm</th>
              <th className="px-6 py-4">Hạn sử dụng</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vouchers?.data?.length > 0 ? (
              vouchers.data.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-blue-600 bg-blue-50/50">
                    {voucher.code}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {voucher.discount_type === "PERCENT"
                      ? "Phần trăm (%)"
                      : "Số tiền (đ)"}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {voucher.discount_value}
                    {voucher.discount_type === "PERCENT" ? "%" : "đ"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatCurrency(voucher.min_order_value)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {voucher.max_discount
                      ? formatCurrency(voucher.max_discount)
                      : "Không giới hạn"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(voucher.end_date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(voucher.is_active)}`}
                    >
                      {voucher.is_active ? "Đang hoạt động" : "Đã khóa"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleUpdate(voucher.id)}
                      disabled={fetcher.state !== "idle"}
                      className={` font-bold text-xs ${voucher.is_active === true ? "text-red-600 hover:text-red-800" : "text-blue-600 hover:text-blue-800"}`}
                    >
                      {voucher.is_active === true ? "Xoá" : "Cập nhật"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10 text-slate-400">
                  Không có dữ liệu voucher
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <CreateVoucherModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default VoucherPage;
