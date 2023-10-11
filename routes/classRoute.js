import express from "express";

import {
  addClassController,
  deleteClassController,
  getClassController,
  listClassesController,
  updateClassController,
} from "../controllers/classController.js";

//router obj
const router = express.Router();

//routing
router.post("/class-add", addClassController);
router.put("/class-update/:cid", updateClassController);
router.delete("/class-delete/:cid", deleteClassController);
router.get( "/class-list",listClassesController);
router.get("/class-detail/:cid", getClassController);

export default router;
