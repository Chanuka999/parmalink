import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

const AdminAddNewProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [stock, setStock] = useState("");
  const [expiryDate, setExpiryData] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState("");
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }

    const promises = [];
    for (let i = 0; i < image.length; i++) {
      promises[i] = mediaUpload(image[i]);
    }
    try {
      const urls = await Promise.all(promises);

      const medicine = {
        name: name,
        category: category,
        description: description,
        price: Number(price),
        stock: Number(stock),
        expiryDate: expiryDate,
        prescriptionRequired: prescriptionRequired === "yes",
        image: urls,
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/medicine",
        medicine,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast.success("product added successfully");
      navigate("/admin/medicine");
    } catch (error) {
      toast.error("An error occurred");
      console.error("Backend Error Details:", error.response?.data);

      // Show the specific message (e.g., "Path 'price' is required")
      const serverMessage =
        error.response?.data?.message || "Internal Server Error";
      toast.error(serverMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Product Name</label>
            <input
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Category</label>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="medicine">Medicine</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Description</label>
            <textarea
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Price ($)</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={price}
              onChange={(e) => SetPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Stock</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Available quantity"
            />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Expiry Date</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={expiryDate}
              onChange={(e) => setExpiryData(e.target.value)}
            />
          </div>

          {/* Prescription Required */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Prescription Required
            </label>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={prescriptionRequired}
              onChange={(e) => setPrescriptionRequired(e.target.value)}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Upload Images</label>
            <input
              type="file"
              className="border rounded-lg px-3 py-2 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              onChange={(e) => setImage(e.target.files)}
              multiple
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 gap-2 flex justify-center">
          <button
            onClick={addProduct}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-20"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("admin/medicine")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;
