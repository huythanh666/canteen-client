import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import PublicRoute from "./publicRoutes";

const authRoutes = {
  element: <PublicRoute />,
  children: [
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/register",
      element: <SignUpPage />,
    },
  ],
};

export default authRoutes;
