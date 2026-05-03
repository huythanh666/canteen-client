import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const RoleBasedRoute = ({ allowedRoles }) => {
  const token = useAuthStore((state) => state.accessToken);
  const userRole = useAuthStore((state) => state.user?.role);
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/403-unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
