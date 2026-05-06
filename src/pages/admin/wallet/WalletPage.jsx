import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import DepositModal from "./DepositWallet";

function WalletPage() {
  const { data } = useLoaderData();
  const listWallet = data?.listWallet || [];
  const [selectedWallet, setSelectedWallet] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value || 0);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-800">Quản lý Ví tiền</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500 font-medium">
            Tổng số ví: {listWallet.length}
          </div>
          <Link
            to="transactions"
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            Lịch sử giao dịch
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Số dư ví</th>
              <th className="px-6 py-4">Level</th>
              <th className="px-6 py-4">Tổng chi tiêu</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listWallet.map((wallet) => (
              <tr
                key={wallet.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {wallet.user.name}
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {formatCurrency(wallet.balance)}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-100">
                    {wallet.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {formatCurrency(wallet.total_spending)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedWallet(wallet)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-800 transition-all shadow-sm"
                  >
                    Nạp tiền
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedWallet && (
        <DepositModal
          wallet={selectedWallet}
          onClose={() => setSelectedWallet(null)}
        />
      )}
    </div>
  );
}

export default WalletPage;
