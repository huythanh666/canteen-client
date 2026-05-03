import { useEffect, useState } from "react";
import userService from "../../../services/userService";

function StaffDetailModal({ userId, onClose }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await userService.getUserById(userId);
        setUserData(res.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">
            Chi tiết nhân viên
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">Đang tải...</div>
        ) : userData ? (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Tên nhân viên</span>
              <span className="font-bold text-slate-800">{userData.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-700">
                {userData.email}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Vai trò</span>
              <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-xs">
                {userData.role}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Ngày sinh</span>
              <span className="font-medium text-slate-700">
                {new Date(userData.birthday).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Trạng thái</span>
              <span
                className={`px-2 py-1 rounded-md font-bold text-xs ${userData.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {userData.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ngày tham gia</span>
              <span className="font-medium text-slate-700">
                {new Date(userData.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-red-500">
            Không tìm thấy thông tin
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffDetailModal;
