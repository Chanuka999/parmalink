import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-[100px] bg-accent text-white px-[40px]">
      <div className="w-full h-full flex relative">
        <img
          src="/logoo.png"
          alt=""
          className="h-full w-[170px] absolute left-0 object-cover"
        />
        <div className="h-full w-full flex justify-center items-center text-lg gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/product">product</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
