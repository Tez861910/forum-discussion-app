import express from "express";
import {
  validateReceiptCreate,
  validateReceiptGet,
} from "../../body-validation/messaging-validation-functions/read-receipts-validation.js";

import { handleReceiptCreate } from "../../route-functions/messaging-function-routes/read-receipts-routes/handle-receipt-create.js";
import { handleReceiptGet } from "../../route-functions/messaging-function-routes/read-receipts-routes/handle-receipt-get.js";

const router = express.Router();

// Create read receipt
router.post("/create", validateReceiptCreate, handleReceiptCreate);

// Get read receipt by ID
router.get("/get/:receiptId", validateReceiptGet, handleReceiptGet);

export default router;
