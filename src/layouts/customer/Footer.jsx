import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-800 text-lg">Canteen School</h3>
          <p className="text-slate-500 text-sm">
            Nơi cung cấp bữa ăn chất lượng, an toàn và tiện lợi cho học sinh,
            sinh viên.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-800">Liên kết</h3>
          <ul className="text-slate-600 text-sm space-y-1">
            <li>
              <NavLink to="/customer/homepage" className="hover:text-blue-600">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/customer/menu" className="hover:text-blue-600">
                Thực đơn
              </NavLink>
            </li>
            <li>
              <NavLink to="/customer/orders" className="hover:text-blue-600">
                Đơn hàng của tôi
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-800">Hỗ trợ</h3>
          <p className="text-slate-600 text-sm">
            Email: huythanh022302@gmail.com
          </p>
          <p className="text-slate-600 text-sm">Hotline: 0909.090.090</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-slate-200 text-center text-slate-400 text-xs">
        © 2026 Canteen Management System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
