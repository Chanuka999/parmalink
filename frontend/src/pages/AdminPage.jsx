import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/AdminProductPage";

const AdminPage = () => {
  return (
    <div className="w-full h-full bg-accent flex p-2">
      <div className="w-[300px] h-full bg-accent flex flex-col items-center gap-[20px]">
        <div className="w-[290px] h-[70px] bg-amber-400 rounded-2xl flex items-center mb-3">
          <img src="/logoo.png" alt="" className="h-[70px]" />
          <span className="text-white text-xl">Admin panel</span>
        </div>
        <Link
          part="/admin"
          className="w-[290px] flex items-center gap-3 rounded-lg px-2 text-white"
        >
          <MdDashboardCustomize />
          Dashboard
        </Link>
        <Link
          to="/admin/orders"
          className="w-[290px] flex items-center gap-3 rounded-lg px-2 text-white"
        >
          <BsFillCartPlusFill />
          orders
        </Link>
        <Link
          to="/admin/products"
          className="w-[290px] flex items-center gap-3 rounded-lg px-2 text-white"
        >
          <AiOutlineStock />
          products
        </Link>
        <Link
          to="/admin/users"
          className="w-[290px] flex items-center gap-3 rounded-lg px-2 text-white"
        >
          <HiUsers />
          users
        </Link>
      </div>
      <div className="w-[calc(100%-300px)] border-[2px] h-full bg-secondary rounded-[20px]">
        <div className="w-full h-full max-h-full max-w-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>dashboard</h1>} />
            <Route path="/orders" element={<h1>orders</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
