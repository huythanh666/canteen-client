// src/pages/admin/staff/RegisterUserModal.jsx
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";

function RegisterUserModal({ onClose }) {
  const fetcher = useFetcher();
  const currentUser = useAuthStore((state) => state.user);
  const isSubmitting = fetcher.state === "submitting";
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  useEffect(() => {
    if (fetcher.data?.success) {
      onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <fetcher.Form
        method="post"
        className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl"
      >
        <h2 className="text-xl font-black text-slate-800 mb-4">
          Đăng ký thành viên
        </h2>

        <input type="hidden" name="intent" value="CREATE_USER" />

        {isSuperAdmin ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="campus_id"
              placeholder="Campus ID"
              required
              className="p-3 border rounded-xl"
            />
            <input
              name="canteen_id"
              placeholder="Canteen ID"
              required
              className="p-3 border rounded-xl"
            />
          </div>
        ) : (
          <>
            <input
              type="hidden"
              name="campus_id"
              value={currentUser?.campus_id}
            />
            <input
              type="hidden"
              name="canteen_id"
              value={currentUser?.canteen_id}
            />
          </>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Vai trò
            </label>
            <select
              name="role"
              className="w-full p-3 border rounded-xl bg-white"
            >
              <option value="STUDENT">STUDENT</option>
              <option value="STAFF">STAFF</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              name="name"
              placeholder="Họ và tên"
              required
              className="p-3 border rounded-xl"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded-xl"
            />
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              required
              className="p-3 border rounded-xl"
            />
            <input
              name="birthday"
              type="date"
              className="p-3 border rounded-xl"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-3 bg-slate-100 rounded-xl font-bold"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 p-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default RegisterUserModal;
