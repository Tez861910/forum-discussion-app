import express from "express";
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

// Get all departments
router.get("/get/all", handleDepartmentGetAll);

// Create new department
router.post("/create", validateDepartmentCreate, handleDepartmentCreate);

// Update department
router.put(
  "/update/:departmentId",
  validateDepartmentUpdate,
  handleDepartmentUpdate
);

// Delete department
router.delete(
  "/delete/:departmentId",
  validateDepartmentDelete,
  handleDepartmentDelete
);

export default router;
