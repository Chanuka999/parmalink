import React from "react";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-primary">
      <Header />
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/product" element={<h1>product</h1>} />
        <Route path="/contact" element={<h1>contact</h1>} />
      </Routes>
    </div>
  );
};

export default HomePage;
