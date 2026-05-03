import { Suspense, useEffect, useState } from "react";
import RootLayout from "./layouts/AdminLayout";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes";
import useAuthStore from "./store/useAuthStore";
import FullScreenLoader from "./components/FullScreenLoader";

function App() {
  const isHydrated = useAuthStore((state) => state._hasHydrated);
  const initializeAuth = useAuthStore((state) => state.actions.initializeAuth);
  const [isCheckingServer, setIsCheckingServer] = useState(true);
  useEffect(() => {
    const checkSession = async () => {
      if (isHydrated) {
        await initializeAuth();
        setIsCheckingServer(false);
      }
    };
    checkSession();
  }, [isHydrated, initializeAuth]);
  if (!isHydrated || isCheckingServer) {
    return <div className="loading-global">Loading system data...</div>;
  }
  return (
    <Suspense fallback={<div>Loading system...</div>}>
      <RouterProvider
        fallbackElement={<FullScreenLoader />} // Dành cho Client-side lèo tèo
        hydrateFallbackElement={<FullScreenLoader />}
        router={router}
      />
    </Suspense>
  );
}

export default App;
/*
B1: Kiểm tra store đã cập nhập đầy đủ dữ liệu hay chưa? 
(VD: Header cần tên của user để hiện lên giao diện mà tên của user thì mình lưu trong store,
nếu store chưa kịp lấy về thì nội dung chỗ đó bị trống (Bad UX))
B2: Kiểm tra accessToken và refreshToken của user có còn hiệu lực 0
initializeAuth(): Gọi api getMe để kiểm tra accessToken còn hiệu lực 0, còn thì cho vô 0 cần login
Nếu 0 thì fail trả về 401 -> khi axios interceptor nhận được reponse getMe có mã lỗi 401 thì tự động gọi api refreshToken
nếu refreshToken trong cookies còn thì tạo lại accessToken và gán lại vào zustand store -> store gán lại vào localStorage
Nếu refreshToken cũng 0 chạy được => 2 token đều hết hiệu lực, người dùng phải đăng nhập lại để tạo lại 2 token
*/
