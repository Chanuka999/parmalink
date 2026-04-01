import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/medicine")
      .then((responce) => {
        setProducts(responce.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-gray-50">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Products</h1>

          {products.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500 text-lg">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item, index) => {
                return <ProductCard key={item._id || index} product={item} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
