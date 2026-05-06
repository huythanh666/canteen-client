import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const RoleBasedRoute = ({ allowedRoles }) => {
  const token = useAuthStore((state) => state.accessToken);
  const userRole = useAuthStore((state) => state.user?.role);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);

  if (isRefreshing) {
    return <div className="spinner">Đang khôi phục phiên làm việc...</div>;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/403-unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
