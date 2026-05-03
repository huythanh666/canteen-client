import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);
  if (user) {
    return user.role === "STUDENT" ? (
      <Navigate to="/customer" replace />
    ) : (
      <Navigate to="/admin/orders" replace />
    );
  }
  return <Outlet />;
};
export default PublicRoute;
