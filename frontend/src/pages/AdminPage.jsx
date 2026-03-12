import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="w-full h-full bg-accent flex p-2">
      <div className="w-[300px] h-full bg-accent"></div>
      <div className="w-[calc(100%-300px)] h-full bg-secondary rounded-[20px]">
        <Routes path="/">
          <Route path="/orders" element={<h1>orders</h1>} />
          <Route path="/product" element={<h1>product</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
