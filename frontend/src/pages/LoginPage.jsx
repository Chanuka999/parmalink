import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const responce = await axios.post(
      import.meta.env.VITE_API_URL + "/api/users/login",
      {
        email: email,
        password: password,
      },
    );
    console.log(responce.data);
  };
  return (
    <div className="w-full h-full bg-[url('/logo.jpg')] bg-cover bg-center flex">
      <div className="w-[50%] h-full "></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[500px] backdrop-blur-lg rounded-2xl flex flex-col shadow-2xl gap-[20px] justify-center items-center">
          <input
            type="text"
            onChange={(e) => {
              console.log("email");
              setEmail(e.target.value);
            }}
            className="w-[400px] h-[50px] bg-white"
          />
          <input
            type="text"
            onChange={(e) => {
              console.log("password");
              setPassword(e.target.value);
            }}
            className="w-[400px] h-[50px] bg-white"
          />
          <button onClick={login} className="w-[400px] h-[50px] bg-amber-400">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
