import axios from "axios";
import React from "react";

const AdminProductPage = () => {
  axios.get(import.meta.env.VITE_API_URL + "/api/medicine").then((responce) => {
    console.log(responce.data);
  });
  return <div className="w-full h-full">sample admin product page</div>;
};

export default AdminProductPage;
