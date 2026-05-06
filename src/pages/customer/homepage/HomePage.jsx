import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Canteen Trường Học
          </h1>
          <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Hệ thống cung cấp bữa ăn học đường hiện đại. Chúng tôi cam kết mang
            đến thực phẩm tươi sạch, dinh dưỡng cân bằng và trải nghiệm tiện lợi
            nhất cho mỗi học sinh.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                navigate("/customer/menu");
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Xem thực đơn tuần
            </button>
            <button className="bg-slate-100 text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* 2. Core Values (Nội dung mở rộng) */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-4">
            Giá trị chúng tôi cam kết
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Tại canteen, chúng tôi tin rằng một bữa ăn ngon là nền tảng của một
            ngày học tập hiệu quả. Dưới đây là những tiêu chuẩn mà chúng tôi duy
            trì mỗi ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Dinh dưỡng chuẩn chuyên gia",
              desc: "Mọi thực đơn được xây dựng dựa trên tháp dinh dưỡng dành cho lứa tuổi học đường. Chúng tôi chú trọng sự cân bằng giữa chất đạm, chất xơ và vitamin, giúp học sinh duy trì sự tập trung tối đa.",
              icon: "🥗",
            },
            {
              title: "Quy trình vệ sinh khắt khe",
              desc: "Sức khỏe của học sinh là ưu tiên hàng đầu. Quy trình từ nhập nguyên liệu, chế biến đến bảo quản đều tuân thủ nghiêm ngặt tiêu chuẩn an toàn thực phẩm của Bộ Y tế, không chất bảo quản.",
              icon: "🛡️",
            },
            {
              title: "Trải nghiệm số tiện lợi",
              desc: "Với hệ thống thanh toán qua ví điện tử tích hợp, việc xếp hàng giờ liền đã là quá khứ. Bạn chỉ cần vài giây để chọn món, thanh toán và nhận thông báo khi suất ăn đã sẵn sàng.",
              icon: "⚡",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="font-black text-xl text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 px-4 text-white rounded-2xl ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-6">
              Không gian kết nối học đường
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Canteen không chỉ là nơi để ăn, mà còn là không gian để bạn bè gặp
              gỡ, thư giãn sau những giờ học căng thẳng. Chúng tôi không ngừng
              cải tiến không gian, thiết kế thoáng mát, hiện đại và sạch sẽ để
              mỗi học sinh đều cảm thấy thoải mái như ở nhà.
            </p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="block font-black text-2xl text-blue-400">
                  1000+
                </span>
                <span className="text-slate-400">Suất ăn mỗi ngày</span>
              </div>
              <div>
                <span className="block font-black text-2xl text-blue-400">
                  50+
                </span>
                <span className="text-slate-400">Món ăn thay đổi</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-full">
            <img
              src="https://res.cloudinary.com/da9vcwgbn/image/upload/v1777812969/bepvesinh-giai-phap-dam-bao-ve-sinh-an-toan-thuc-pham-02-1024x576_j0zw78.jpg"
              alt="Canteen bếp vệ sinh an toàn"
              className="w-full h-auto object-cover rounded-3xl shadow-lg border-4 border-indigo-900"
            />
          </div>
        </div>
      </section>

      {/* 4. Hours & Contact */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">
              Giờ hoạt động
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-4">
                <span>☀️ Sáng:</span>{" "}
                <span className="font-bold">06:30 - 08:30</span>
              </li>
              <li className="flex gap-4">
                <span>🕛 Trưa:</span>{" "}
                <span className="font-bold">11:00 - 13:30</span>
              </li>
              <li className="flex gap-4">
                <span>🌙 Chiều:</span>{" "}
                <span className="font-bold">16:00 - 18:00</span>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-black text-slate-800 mb-4">
              Cần hỗ trợ?
            </h3>
            <p className="text-slate-500 mb-4">
              Mọi phản hồi của bạn đều giúp chúng tôi hoàn thiện hơn mỗi ngày.
            </p>
            <button className="text-blue-600 font-bold hover:underline">
              Liên hệ quản lý ngay &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
