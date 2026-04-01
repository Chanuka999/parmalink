import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="productCard bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      {product.image && product.image.length > 0 ? (
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.category}
        </p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-green-600">
            Rs. {product.price}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              product.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {product.prescriptionRequired && (
          <p className="text-xs text-orange-600 font-semibold">
            ⚠️ Prescription Required
          </p>
        )}

        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
