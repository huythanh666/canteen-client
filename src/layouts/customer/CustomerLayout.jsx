import { Outlet, Link, NavLink } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import ReactLogo from "../../components/icon/ReactIcon";
import { NavRoute } from "./NavRoute";
import NavItem from "./NavItem";
import Footer from "./Footer";

function CustomerLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/customer/homepage" className="flex items-center gap-2">
            <ReactLogo className="w-8 h-8 text-blue-400 animate-[spin_20s_linear_infinite]" />
            <span className="text-gray-800 font-bold text-lg tracking-tight uppercase">
              Canteen
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {NavRoute.map((nav) => (
              <NavItem key={nav.path} title={nav.title} path={nav.path} />
            ))}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium text-slate-600">
                    {user.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {user.name?.charAt(0) || "U"}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </nav>
      </header>
      <div className="max-w-6xl mx-auto p-4">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default CustomerLayout;
