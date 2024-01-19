import express from "express";
import {
  validateGenderCreate,
  validateGenderUpdate,
  validateGenderDelete,
} from "../../body-validation/user-validation-functions/gender-validation.js";

import { handleGenderCreate } from "../../route-functions/user-function-routes/gender-routes/handle-gender-create.js";
import { handleGenderUpdate } from "../../route-functions/user-function-routes/gender-routes/handle-gender-update.js";
import { handleGenderDelete } from "../../route-functions/user-function-routes/gender-routes/handle-gender-delete.js";
import { handleGenderGetAll } from "../../route-functions/user-function-routes/gender-routes/handle-gender-get-all.js";

const router = express.Router();

// Get all genders
router.get("/get/all", handleGenderGetAll);

// Create new gender
router.post("/create", validateGenderCreate, handleGenderCreate);

// Update gender
router.put("/update/:genderId", validateGenderUpdate, handleGenderUpdate);

// Delete gender
router.delete("/delete/:genderId", validateGenderDelete, handleGenderDelete);

export default router;
