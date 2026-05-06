import { createBrowserRouter, Navigate } from "react-router-dom";
import RootRedirect from "./RootRedireact";
import PublicRoute from "./publicRoutes";
import authRoutes from "./authRoutes";
import RoleBasedRoute from "./RoleBasedRoute";
import { BusinessPermission } from "../constants/RolePermisson";
import adminRoutes from "./adminRoutes";
import customerRoute from "./customerRoutes";
import NotFoundPage from "../pages/NotFound";
import ForbiddenPage from "../pages/ForbiddenPage";

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
  customerRoute,
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "403-unauthorized",
    element: <ForbiddenPage />,
  },
]);

export default router;
