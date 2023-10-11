import express from "express";
import {
  createStudentAccountController,
  deleteStudentController,
  getAllStudentsController,
  getStudentInfoController,
  updateStudentController,
} from "../controllers/studentController.js";
import {
  isAdmin,
  isStudent,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
import { testController } from "../controllers/authController.js";
import uploadImage from "../middlewares/uploadMiddleware.js";

//router obj
const router = express.Router();

//routing
//Account
router.post("/create", uploadImage, createStudentAccountController);
router.get("/list", getAllStudentsController);
router.delete("/delete/:sid", deleteStudentController);
router.put("/update/:sid", updateStudentController);
router.get("/detail/:sid", getStudentInfoController);

//test
router.get("/account/test", testController);

export default router;
