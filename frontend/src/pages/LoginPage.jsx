import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        {
          email: email,
          password: password,
        },
      );
      localStorage.setItem("token", response.data.token);
      toast.success("login successfully");
      const user = response?.data?.user;
      console.log(user);
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      toast.error("login failed,please check your chedintials");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[url('/logo.jpg')] bg-cover bg-center flex overflow-hidden justify-center items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/45"></div>
      {/* LEFT SIDE DESIGN */}
      <div className="relative z-10 w-1/2 h-full flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Pharmacy System
        </h1>

        <p className="text-lg text-center max-w-md text-white/95 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          Smart pharmacy management platform designed to simplify medicine
          inventory, billing, and prescription management.
        </p>

        <div className="mt-10 flex flex-col gap-3 text-sm text-white font-medium bg-black/35 backdrop-blur-sm px-6 py-5 rounded-2xl border border-white/20">
          <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            ✔ Medicine Inventory Tracking
          </span>
          <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            ✔ Billing & Sales Management
          </span>
          <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            ✔ Prescription Records
          </span>
          <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            ✔ Secure User Access
          </span>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
        <div className="w-[420px] backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-white text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
            Login
          </h1>

          <p className="text-center text-white/90 text-sm">
            Welcome back! Please login to your account
          </p>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-[45px] px-4 rounded-lg bg-white/90 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white/70"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="h-[45px] px-4 rounded-lg bg-white/90 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white/70"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="h-[50px] rounded-lg bg-accent text-white font-semibold hover:bg-secondary transition-all duration-300 shadow-lg shadow-black/30"
          >
            Login
          </button>

          <p className="text-center text-white/70 text-sm">
            Pharmacy Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
