import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
} from "../controllers/medicineController.js";

const MedicineRouter = express.Router();

MedicineRouter.get("/", getAllMedicine);
MedicineRouter.post("/", createMedicine);
MedicineRouter.delete("/:id", deleteMedicine);
MedicineRouter.put("/:id", updateMedicine);
MedicineRouter.get("/:id", getMedicineById);

export default MedicineRouter;
