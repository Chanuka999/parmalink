import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/medicine/${id}`)
      .then((response) => {
        const medicineData = response.data.data || response.data;
        setProduct(medicineData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-500 hover:text-blue-700 font-semibold"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            {product.image && product.image.length > 0 ? (
              <img
                src={product.image[0]}
                alt={product.name}
                className="max-w-full h-auto object-cover rounded"
              />
            ) : (
              <div className="text-gray-400 text-center">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            <p className="text-gray-600 text-sm mb-4">
              Category:{" "}
              <span className="font-semibold">{product.category}</span>
            </p>

            <p className="text-3xl font-bold text-green-600 mb-6">
              Rs. {product.price}
            </p>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm">
                Stock Available:{" "}
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.stock > 0
                    ? `${product.stock} units`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            {product.expiryDate && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Expiry Date:{" "}
                  <span className="font-semibold">
                    {new Date(product.expiryDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            {product.prescriptionRequired && (
              <div className="mb-6 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 text-sm">
                ⚠️ Prescription Required
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={product.stock === 0}
                >
                  -
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={product.stock === 0}
                >
                  +
                </button>
              </div>

              <button
                disabled={product.stock === 0}
                className={`px-8 py-2 rounded font-semibold text-white ${
                  product.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
