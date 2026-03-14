import axios from "axios";
import { MdSecurityUpdateGood } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminProductPage = () => {
  const [medicine, setMedicine] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const formatPrice = (value) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) return value;
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/medicine")
      .then((responce) => {
        console.log(responce.data);
        setMedicine(responce.data);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-secondary/85 to-secondary p-4 md:p-8">
      <Link
        to="/admin/add-product"
        className="fixed right-[55px] bottom-[70px] text-3xl"
      >
        <FaPlusCircle className="" />
      </Link>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 rounded-2xl bg-white/95 p-5 shadow-lg ring-1 ring-black/5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Inventory Management
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage medicines, monitor stock, and keep expiry dates in check.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-primary/70 px-4 py-3 text-slate-900">
                <p className="text-xs uppercase tracking-wide text-slate-600">
                  Total Items
                </p>
                <p className="mt-1 text-xl font-semibold">{medicine.length}</p>
              </div>
              <div className="rounded-xl bg-amber-100 px-4 py-3 text-slate-900">
                <p className="text-xs uppercase tracking-wide text-slate-600">
                  Low Stock
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {medicine.filter((item) => Number(item.stock) < 100).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 shadow-lg ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Expiry Date</th>
                  <th className="px-4 py-3 font-semibold">Supplier ID</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {medicine.map((item) => {
                  const isLowStock = Number(item.stock) < 100;

                  return (
                    <tr
                      key={item._id || item.createMama || item.name}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isLowStock
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(item.expiryDate)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.supplierId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                            aria-label="Delete item"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                          <button
                            type="button"
                            className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                            aria-label="Update item"
                          >
                            <MdSecurityUpdateGood className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {medicine.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      No medicine records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
