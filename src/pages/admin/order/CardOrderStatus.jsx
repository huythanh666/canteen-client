import { ColorStatus } from "./orderCard.status";
import { useSearchParams } from "react-router-dom";

function CardOrderStatus({ status, count }) {
  const bgColor = ColorStatus[status];
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabChange = () => {
    setSearchParams({ status, page: 1 });
  };
  return (
    <div
      onClick={handleTabChange}
      className={`w-full h-24 text-white font-bold text-sm rounded-2xl ${bgColor} 
              flex justify-evenly items-center gap-2 hover:opacity-75 
              cursor-pointer transition-all hover:scale-[1.02] shadow-sm`}
    >
      <span className="uppercase tracking-wider">{status}</span>
      <span className="text-xl bg-white/20 px-3 py-1 rounded-lg">{count}</span>
    </div>
  );
}
export default CardOrderStatus;
