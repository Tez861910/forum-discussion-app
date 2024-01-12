import express from "express";
import {
  validateFacultyCreate,
  validateFacultyUpdate,
  validateFacultyDelete,
} from "../../body-validation/user-validation-functions/faculty-validation.js";

import { handleFacultyCreate } from "../../route-functions/user-function-routes/faculty-routes/handle-faculty-create.js";
import { handleFacultyUpdate } from "../../route-functions/user-function-routes/faculty-routes/handle-faculty-update.js";
import { handleFacultyDelete } from "../../route-functions/user-function-routes/faculty-routes/handle-faculty-delete.js";
import { handleFacultyGetAll } from "../../route-functions/user-function-routes/faculty-routes/handle-faculty-get-all.js";

const router = express.Router();

// Get all faculty members
router.get("/get/all", handleFacultyGetAll);

// Create new faculty member
router.post("/create", validateFacultyCreate, handleFacultyCreate);

// Update faculty member
router.put("/update/:facultyId", validateFacultyUpdate, handleFacultyUpdate);

// Delete faculty member
router.delete("/delete/:facultyId", validateFacultyDelete, handleFacultyDelete);

export default router;
