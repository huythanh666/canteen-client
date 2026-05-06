import { NavLink } from "react-router-dom";

function NavItem({ title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "text-blue-600 font-bold"
          : "text-slate-600 hover:text-blue-600"
      }
    >
      {title}
    </NavLink>
  );
}
export default NavItem;
