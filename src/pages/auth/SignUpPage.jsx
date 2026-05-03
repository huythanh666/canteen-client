import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as z from "zod";
import authService from "../../services/authService";

const signUpSchema = z.object({
  name: z.string().min(2, "Tên phải ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  campus_id: z.string().min(1, "Vui lòng chọn cơ sở"),
  canteen_id: z.string().min(1, "Vui lòng chọn canteen"),
  birthday: z.string().min(1, "Vui lòng chọn ngày sinh"),
  email_parents: z
    .string()
    .email("Email phụ huynh không hợp lệ")
    .optional()
    .or(z.literal("")),
});
function SignUpPage() {
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState([]);
  const [canteens, setCanteens] = useState([]);

  // Load danh sách Campus và Canteen để chọn
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campusRes, canteenRes] = await Promise.all([]);
        setCampuses(campusRes || []);
        setCanteens(canteenRes || []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu cơ sở", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.signUp(data); //
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@school.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  password
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Campus ID */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Campus
                </label>
                <select
                  {...register("campus_id")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Select Campus</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.campus_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.campus_id.message}
                  </p>
                )}
              </div>

              {/* Canteen ID */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Canteen
                </label>
                <select
                  {...register("canteen_id")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Select Canteen</option>
                  {canteens.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.canteen_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.canteen_id.message}
                  </p>
                )}
              </div>

              {/* Birthday */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Birthday
                </label>
                <input
                  {...register("birthday")}
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
                {errors.birthday && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.birthday.message}
                  </p>
                )}
              </div>

              {/* Parents Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Parent's Email
                </label>
                <input
                  {...register("email_parents")}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="parents@mail.com"
                />
                {errors.email_parents && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email_parents.message}
                  </p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="col-span-2 w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
              >
                {isSubmitting ? "Processing..." : "Create an account"}
              </button>

              <p className="col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
