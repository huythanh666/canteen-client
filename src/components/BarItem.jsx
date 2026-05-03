import { NavLink } from "react-router-dom";

function BarItem({ title, data, path }) {
  return (
    <li className="my-3">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center px-2 py-1.5 text-xs rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group hover:bg-gray-100 hover:text-blue-400 hover:rounded-3xl ${isActive ? `bg-gray-100 text-blue-400 rounded-3xl` : ``}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={data} />
        </svg>

        <span className="ms-3">{title}</span>
      </NavLink>
    </li>
  );
}

export default BarItem;
