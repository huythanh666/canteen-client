import React from "react";
import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-gray-800 mb-2">
        Truy cập bị từ chối
      </h1>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        Bạn không có đủ quyền hạn để truy cập vào trang này. Vui lòng liên hệ
        quản trị viên nếu bạn nghĩ đây là sự nhầm lẫn.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
        >
          Quay lại
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}

export default ForbiddenPage;
