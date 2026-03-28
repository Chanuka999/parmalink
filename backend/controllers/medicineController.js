import Medicine from "../models/medicine.js";
import { isAdmin } from "./userController.js";

export async function createMedicine(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not authorized to create a medicine",
    });
    return;
  }
  try {
    const { supplierId, ...medicinedata } = req.body;
    const medicine = new Medicine(medicinedata);
    await medicine.save();

    res.json({
      message: "medicine added successfully",
      medicine: medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create medicine",
    });
  }
}

export async function getAllMedicine(req, res) {
  try {
    const medicine = await Medicine.find();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: "failed to retreview medicine",
    });
  }
}

export async function deleteMedicine(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "you are not authorized to delete medicine",
    });
  }
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      res.status(403).json({
        message: "not find medicine",
      });
    }

    res.status(200).json({
      message: "medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to delete product",
    });
  }
}

export async function updateMedicine(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "you are not authorize to update medicine",
    });
  }
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!medicine) {
      res.json({
        message: "medicine not found",
      });
    }

    res.json({ message: "update medicine successfuly" });
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

export async function getMedicineById(req, res) {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      res.json({
        message: "not find medicine",
      });
    }
    res.json({
      message: "display medicine successfully",
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}
