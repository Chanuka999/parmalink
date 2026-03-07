import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    prescriptionRequired: {
      type: Boolean,
      default: false,
    },

    image: {
      type: [String],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
