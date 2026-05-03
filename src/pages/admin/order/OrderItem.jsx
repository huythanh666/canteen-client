import { useFetcher } from "react-router-dom";
import { formatOrderTime } from "../../../utils/formatTime";

function OrderItem({ detail, onViewDetail }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const fetcher = useFetcher();
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "PENDING":
        return { label: "Xác nhận", value: "PROCESSING", color: "bg-blue-600" };
      case "PROCESSING":
        return {
          label: "Hoàn thành",
          value: "COMPLETED",
          color: "bg-green-600",
        };
      default:
        return null;
    }
  };

  const nextStep = getNextStatus(detail.status);
  const isUpdating = fetcher.state !== "idle";
  return (
    <div className="w-full min-h-[180px] bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 flex-1">
            {detail.customer_name}
          </h3>
          <span className="text-[10px] font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-full uppercase">
            {detail.status}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span>🕒</span> {formatOrderTime(detail.created_at)}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Số món: <span className="text-blue-600">{detail.items.length}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">Tổng thanh toán</span>
          <span className="font-bold text-rose-500 text-base">
            {formatCurrency(detail.final_price)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewDetail}
            type="button"
            className="flex-1 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-xs px-3 py-2 transition-colors"
          >
            Chi tiết
          </button>
          {nextStep && (
            <fetcher.Form method="PUT" action="/admin/orders">
              <input type="hidden" name="orderId" value={detail.id} />
              <input type="hidden" name="nextStatus" value={nextStep.value} />

              <button
                type="submit"
                disabled={isUpdating}
                className={`flex-1 text-white font-bold rounded-xl text-xs px-4 py-2.5 transition-all active:scale-95 shadow-lg ${nextStep.color} ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
              >
                {isUpdating ? "Đang xử lý..." : nextStep.label}
              </button>
            </fetcher.Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;

/*
method="PUT": Khai báo phương thức gửi dữ liệu. Mặc dù HTML Form chỉ hỗ trợ GET/POST, nhưng React Router fetcher cho phép fen dùng các phương thức khác như PUT/DELETE để đúng chuẩn RESTful.  
action="/admin/orders": Chỉ định cái Action nào sẽ xử lý dữ liệu này. Khi bấm submit, React Router sẽ đi tìm route /admin/orders và thực thi hàm action: updateOrderAction mà fen đã đăng ký trong adminRoutes.
Fen bấm nút "Xác nhận".fetcher chuyển trạng thái sang khác idle, nút bị vô hiệu hóa, hiện chữ "Đang xử lý...".  Dữ liệu từ 2 thẻ input hidden được gửi lên hàm updateOrderAction.  Sau khi Server update xong, fetcher sẽ báo cho trang OrderPage gọi lại loader để lấy danh sách mới.  Dữ liệu mới về, nút bấm tự động biến mất hoặc đổi màu/chữ cho phù hợp với trạng thái tiếp theo.  
*/
