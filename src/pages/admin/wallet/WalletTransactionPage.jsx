// src/pages/admin/wallet/WalletTransactionPage.jsx
import { useLoaderData } from "react-router-dom";

function WalletTransactionPage() {
  const transactions = useLoaderData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-800 mb-8">
        Danh sách Giao dịch
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Mô tả</th>
              <th className="px-6 py-4">Số tiền</th>
              <th className="px-6 py-4">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions?.data?.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {t.name || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${t.type === "TOPUP" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{t.description}</td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {formatCurrency(t.amount)}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {formatDate(t.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WalletTransactionPage;
