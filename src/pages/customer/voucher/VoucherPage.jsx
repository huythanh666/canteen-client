import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import VoucherCard from "./VoucherCard";

function VoucherPage() {
  const { allVouchers, myVouchers } = useLoaderData();

  const vouchers = allVouchers?.data || [];
  const userVouchers = myVouchers?.data || [];

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value || 0);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "30px",
        gap: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Cột trái: Kho Voucher */}
      <div
        style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 60px)" }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#333",
            borderLeft: "4px solid #ee4d2d",
            paddingLeft: "15px",
          }}
        >
          Kho Voucher của Canteen
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {vouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              setSelectedVoucher={setSelectedVoucher}
              selectedVoucher={selectedVoucher}
            />
          ))}
        </div>
      </div>

      {/* Cột phải: Voucher của tôi */}
      <div
        style={{
          flex: 0.8,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          height: "fit-content",
          position: "sticky",
          top: "30px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#2c3e50",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>VOUCHER CỦA TÔI</h3>
          <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", opacity: 0.8 }}>
            Sẵn sàng để sử dụng
          </p>
        </div>

        <div style={{ padding: "20px" }}>
          {userVouchers.length > 0 ? (
            userVouchers.map((v) => (
              <div
                key={v.id}
                style={{
                  border: "2px dashed #27ae60",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#f9fffb",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
                    Mã: {v.code}
                  </span>
                  <span
                    style={{
                      color: "#27ae60",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {v.status}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#ee4d2d",
                    margin: "8px 0",
                  }}
                >
                  Giảm{" "}
                  {v.discount_type === "FIXED"
                    ? `${formatCurrency(v.discount_value)}đ`
                    : `${v.discount_value}%`}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#7f8c8d" }}>
                  Đơn tối thiểu: {formatCurrency(v.min_order_value)}đ
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(v.code);
                    alert("Đã copy mã!");
                  }}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "6px",
                    border: "1px solid #27ae60",
                    background: "none",
                    color: "#27ae60",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Sao chép mã
                </button>
              </div>
            ))
          ) : (
            <div
              style={{ textAlign: "center", color: "#999", padding: "20px" }}
            >
              Bạn chưa có voucher nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoucherPage;
