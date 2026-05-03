import { Outlet } from "react-router-dom";
import BarItem from "../components/BarItem";
import { SideBar } from "../constants/SideBar";
import ReactLogo from "../components/icon/ReactIcon";
import useAuthStore from "../store/useAuthStore";

function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="grid grid-cols-7 h-screen w-full">
      <aside className="col-span-1 h-screen border-r border-gray-300 bg-neutral-primary-soft overflow-y-auto">
        <div className="px-3 py-6">
          <div className="flex justify-center items-center gap-3 mb-8">
            <ReactLogo
              className={
                "w-10 h-10 text-blue-400 animate-[spin_20s_linear_infinite]"
              }
            />
            <h1 className="text-center text-gray-600 font-bold text-sm uppercase tracking-wider">
              Canteen
            </h1>
          </div>
          <ul className="space-y-3 font-medium">
            {SideBar.map((e) => (
              <BarItem
                key={e.title}
                title={e.title}
                path={e.path}
                data={e.data}
              />
            ))}
          </ul>
        </div>
      </aside>
      <main className="col-span-6 flex flex-col overflow-hidden bg-gray-50">
        <header className="flex-none text-white text-base flex justify-between items-center w-full h-[9dvh] bg-blue-400 p-5 font-medium">
          <h1 className=" w-1/2">{user.canteen_name}</h1>
          <div className="w-1/2 flex items-center justify-end gap-5">
            <span>{`${user.name} (${user.role})`}</span>
            <img
              className="w-10 h-10 rounded-full"
              src="../public/6bd828068a62aab41e75ebf829e2fc5d.jpg"
              alt="avatar"
            ></img>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
