// utils/loaderHandler.js
export const handleLoader =
  (apiCall) =>
  async ({ request }) => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams.entries());
      const response = await apiCall(params);
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        throw new Response("Forbidden", { status: 403 });
      }
      throw error;
    }
  };
/*

1. request nằm trong đó là gì?
Trong React Router, khi một route được kích hoạt, nó tự động truyền một object vào hàm loader. Một trong những thuộc tính quan trọng nhất của object đó chính là request.
Bản chất: request là một đối tượng Fetch API Request tiêu chuẩn của trình duyệt.
Chứa cái gì? Nó chứa tất cả thông tin về yêu cầu hiện tại, bao gồm:
URL: Đường dẫn đầy đủ trên thanh địa chỉ (ví dụ: http://localhost:5173/admin/orders?status=PENDING&page=3).
Method: Thường là "GET" đối với loader.
Headers: Các thông tin bổ sung của trình duyệt.

new URL(request.url): Lấy địa chỉ đang hiển thị trên trình duyệt.
url.searchParams: Lấy ra phần sau dấu chấm hỏi (ví dụ: status=PENDING&page=3).
Object.fromEntries(...): Biến đống tham số đó thành một Object Javascript gọn gàng: { status: "PENDING", page: "3" }.
*/
