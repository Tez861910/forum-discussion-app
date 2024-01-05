import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
import {
  validateDepartmentCreate,
  validateDepartmentUpdate,
  validateDepartmentDelete,
} from "../../body-validation/user-validation-functions/department-validation.js";

import { handleDepartmentCreate } from "../../route-functions/user-function-routes/department-routes/handle-department-create.js";
import { handleDepartmentUpdate } from "../../route-functions/user-function-routes/department-routes/handle-department-update.js";
import { handleDepartmentDelete } from "../../route-functions/user-function-routes/department-routes/handle-department-delete.js";
import { handleDepartmentGetAll } from "../../route-functions/user-function-routes/department-routes/handle-department-get-all.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all departments
router.get("/get/all", verifyJwt, handleDepartmentGetAll);

// Create new department
router.post(
  "/create",
  verifyJwt,
  validateDepartmentCreate,
  handleDepartmentCreate
);

// Update department
router.put(
  "/update/:departmentId",
  verifyJwt,
  validateDepartmentUpdate,
  handleDepartmentUpdate
);

// Delete department
router.delete(
  "/delete/:departmentId",
  verifyJwt,
  validateDepartmentDelete,
  handleDepartmentDelete
);

export default router;
