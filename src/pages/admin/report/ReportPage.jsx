import React from "react";
import { useLoaderData } from "react-router-dom";

function ReportPage() {
  const data = useLoaderData();
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value || 0);
  };
  if (!data)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
    );

  const {
    inventoryReport,
    inventoryTransactionReport,
    orderReport,
    walletReport,
  } = data;

  const totalRevenue = orderReport?.data?.total_revenue || 0;
  const totalInventoryValue = inventoryReport?.data?.total_value || 0;
  const totalBalance = walletReport?.data?.total_balance || 0;
  const totalSpending = walletReport?.data?.total_spending || 0;
  const walletNet = totalBalance - totalSpending;
  const financialHealth = totalRevenue - (totalInventoryValue + totalBalance);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Báo cáo tổng quan tài chính
      </h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Phân tích Số dư Tài chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Doanh thu"
            value={formatCurrency(totalRevenue)}
            color="text-green-600"
          />
          <StatCard
            title="Giá trị kho"
            value={formatCurrency(totalInventoryValue)}
            color="text-blue-600"
          />
          <StatCard
            title="Tổng tiền trong ví (all)"
            value={formatCurrency(totalBalance)}
            color="text-indigo-600"
          />
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Số dư tài chính ròng</p>
            <p
              className={`text-xl font-black ${financialHealth >= 0 ? "text-purple-700" : "text-red-600"}`}
            >
              {formatCurrency(financialHealth)}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              = Doanh thu - (Giá trị kho + Ví ròng)
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng đơn hàng"
          value={orderReport?.data?.total_orders || 0}
          subValue="Đơn thành công"
        />
        <StatCard
          title="Tổng lượng hàng"
          value={`${inventoryReport?.data?.total_quantity?.toLocaleString() || 0}`}
          subValue="Đơn vị sản phẩm"
        />
        <StatCard
          title="Số lượng ví"
          value={walletReport?.data?.total_wallet || 0}
          subValue="Ví quản lý"
        />
        <StatCard
          title="Chi tiêu ví"
          value={formatCurrency(totalSpending)}
          subValue="Giao dịch"
          color="text-red-600"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Giao dịch kho (Import/Export)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inventoryTransactionReport?.data?.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-sm font-semibold uppercase text-gray-500">
                {item.type === "IMPORT" ? "Nhập kho" : "Xuất kho"}
              </p>
              <div className="flex justify-between items-end mt-2">
                <span className="text-xl font-bold">
                  {item._sum?.quantity || 0}
                </span>
                <span className="text-sm text-gray-600">
                  Số lượng items: {item._count?.id || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component helper
function StatCard({ title, value, subValue, color = "text-gray-800" }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {subValue && <p className="text-xs text-gray-400 mt-2">{subValue}</p>}
    </div>
  );
}

export default ReportPage;
