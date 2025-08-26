import React from "react";
import { CheckCircle, Lock, Mail, ArrowRight, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDevice } from "../context/AppContext";

export default function RegisterPage() {
  const device = useDevice();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAgree: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center pb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <img src="/logo.svg" alt="logo" className="rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Đăng ký
          </h1>
          <span className="text-gray-600">
            Tạo tài khoản để trải nghiệm dịch vụ tốt nhất
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form
            action="http://localhost:5000/register"
            method="post"
            className="space-y-5"
          >
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block font-semibold text-gray-800 text-sm"
              >
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  placeholder="Nhập họ và tên của bạn..."
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block font-semibold text-gray-800 text-sm"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  placeholder="Nhập username của bạn..."
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-semibold text-gray-800 text-sm"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  placeholder="Nhập email của bạn..."
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block font-semibold text-gray-800 text-sm"
              >
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  placeholder="Nhập số điện thoại của bạn..."
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-semibold text-gray-800 text-sm"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  placeholder="Nhập mật khẩu của bạn..."
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold text-gray-800 text-sm"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Nhập lại mật khẩu của bạn..."
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="isAgree"
                id="agree"
                checked={formData.isAgree}
                onChange={(e) => handleInputChange("isAgree", e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <label
                htmlFor="agree"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Tôi đồng ý với{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              Đăng ký
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/register-google"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Link>
              <Link
                to="/register-facebook"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="#1877F2"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Bạn đã có tài khoản? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
