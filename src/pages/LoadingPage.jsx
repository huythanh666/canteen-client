function LoadingPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-200 animate-spin animate-reverse delay-75"></div>
      </div>

      <p className="mt-6 text-gray-400 font-medium animate-pulse">
        Đang tải dữ liệu...
      </p>
    </div>
  );
}

export default LoadingPage;
