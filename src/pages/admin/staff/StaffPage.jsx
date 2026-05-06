// src/pages/admin/staff/StaffPage.jsx
import { useFetcher, useLoaderData } from "react-router-dom";
import StaffDetailModal from "./StaffDetailModal";
import { useState } from "react";
import RegisterUserModal from "./RegisterUserModal";

function StaffPage() {
  const users = useLoaderData();
  const fetcher = useFetcher();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const getRoleStyle = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-700";
      case "ADMIN":
        return "bg-blue-100 text-blue-700";
      case "STAFF":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  const getStatusStyle = (status) => {
    return status === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };
  const handleDelete = (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
    const formData = new FormData();
    formData.append("intent", "DELETE_USER");
    formData.append("userId", userId);
    fetcher.submit(formData, { method: "post" });
  };
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black">Danh sách nhân viên</h1>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"
        >
          + Đăng ký thành viên
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Tên nhân viên</th>
              <th className="px-6 py-4">Email/Tài khoản</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Canteen</th>
              <th className="px-6 py-4">Trạng thái</th> {/* Cột mới */}
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users?.data?.length > 0 ? (
              users.data.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.email || user.username}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${getRoleStyle(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.canteen?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(user.status)}`}
                    >
                      {user.status === "ACTIVE" ? "Hoạt động" : "Đã khóa"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={fetcher.state !== "idle"}
                        className="text-red-600 hover:text-red-800 font-bold text-xs"
                      >
                        {fetcher.state === "submitting" ? "..." : "Xóa"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-400">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isRegisterOpen && (
        <RegisterUserModal onClose={() => setIsRegisterOpen(false)} />
      )}
      {selectedUserId && (
        <StaffDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}

export default StaffPage;
