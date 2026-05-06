import React from "react";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-9xl font-black text-blue-200 mb-6 select-none">
        404
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Trang không tồn tại
      </h1>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        Xin lỗi, trang bạn đang tìm kiếm có thể đã bị xóa hoặc đường dẫn không
        đúng.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}
export default NotFoundPage;
