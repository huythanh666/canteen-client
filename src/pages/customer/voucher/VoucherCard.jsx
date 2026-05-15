import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

function VoucherCard({ voucher, setSelectedVoucher, selectedVoucher }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        alert(fetcher.data.message);
      } else {
        alert("Lỗi: " + fetcher.data.message);
      }
    }
  }, [fetcher.data]);
  const handleSave = (e) => {
    e.stopPropagation();
    fetcher.submit({ voucherId: voucher.id }, { method: "post" });
  };

  return (
    <div
      onClick={() => setSelectedVoucher(voucher)}
      style={{
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow:
          selectedVoucher?.id === voucher.id
            ? "0 4px 12px rgba(238, 77, 45, 0.2)"
            : "0 2px 8px rgba(0,0,0,0.05)",
        border:
          selectedVoucher?.id === voucher.id
            ? "1.5px solid #ee4d2d"
            : "1.5px solid transparent",
        cursor: "pointer",
        transition: "all 0.3s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "120px",
          backgroundColor: voucher.is_active ? "#ee4d2d" : "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>GIẢM</span>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {voucher.discount_type === "PERCENT"
            ? `${voucher.discount_value}%`
            : `${formatCurrency(voucher.discount_value / 1000)}k`}
        </span>
      </div>

      <div style={{ flex: 1, padding: "15px", position: "relative" }}>
        <h4
          style={{ margin: "0 0 8px 0", color: "#ee4d2d", fontSize: "1.1rem" }}
        >
          Mã: {voucher.code}
        </h4>
        <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#666" }}>
          Đơn tối thiểu:{" "}
          <span style={{ color: "#333", fontWeight: "500" }}>
            {formatCurrency(voucher.min_order_value)} VNĐ
          </span>
        </p>
        <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#666" }}>
          Hạn dùng: {new Date(voucher.end_date).toLocaleDateString("vi-VN")}
        </p>

        <button
          onClick={handleSave}
          disabled={isSubmitting || !voucher.is_active}
          style={{
            position: "absolute",
            right: "15px",
            bottom: "15px",
            backgroundColor: isSubmitting ? "#ccc" : "#ee4d2d",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "0.85rem",
          }}
        >
          {isSubmitting ? "Đang lưu..." : "Lấy Voucher"}
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          left: "110px",
          top: "-10px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: "110px",
          bottom: "-10px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
        }}
      ></div>
    </div>
  );
}

export default VoucherCard;
