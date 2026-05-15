import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const RootRedirect = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  return user.role === "STUDENT" ? (
    <Navigate to="/customer/homepage" replace />
  ) : (
    <Navigate to="/admin/orders" replace />
  );
};
export default RootRedirect;
