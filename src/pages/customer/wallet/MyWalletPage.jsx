import React from "react";
import { useLoaderData } from "react-router-dom";

function MyWalletPage() {
  const response = useLoaderData();

  const myWallet = response?.data || {};
  const { balance = 0, wallet_transaction = [] } = myWallet;
  console.log(wallet_transaction);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-6 overflow-hidden">
      <h1 className="flex-none text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-400 pl-3">
        Ví điện tử
      </h1>

      <div className="flex-none bg-blue-600 rounded-3xl p-8 text-white shadow-lg shadow-blue-500/30 mb-6">
        <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">
          Số dư hiện tại
        </p>
        <h2 className="text-4xl font-black mt-2">{formatCurrency(balance)}</h2>
      </div>
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex-none">
          <h3 className="font-bold text-gray-700">Lịch sử giao dịch</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wallet_transaction.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p>Chưa có giao dịch nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wallet_transaction.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        tx.type === "PAYMENT"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {tx.type === "PAYMENT" ? "⬆️" : "⬇️"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(tx.created_at).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-black ${
                      tx.type === "PAYMENT" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {tx.type === "PAYMENT" ? "-" : "+"}{" "}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWalletPage;
