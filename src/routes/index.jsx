import { createBrowserRouter, Navigate } from "react-router-dom";
import RootRedirect from "./RootRedireact";
import PublicRoute from "./publicRoutes";
import authRoutes from "./authRoutes";
import RoleBasedRoute from "./RoleBasedRoute";
import { BusinessPermission } from "../constants/RolePermisson";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  authRoutes,
  {
    element: <RoleBasedRoute allowedRoles={BusinessPermission} />,
    children: [adminRoutes],
  },
  {
    path: "*",
    element: <div>404 - Trang không tồn tại</div>,
  },
]);

export default router;
