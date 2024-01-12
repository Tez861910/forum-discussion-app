import express from "express";
import {
  validateReadReceiptGroupCreate,
  validateReadReceiptGroupGet,
} from "../../body-validation/groupchat-validation-functions/read-receipts-group-validation.js";

import { handleReadReceiptGroupCreate } from "../../route-functions/groupchat-function-routes/read-receipts-group-routes/handle-read-receipt-group-create.js";
import { handleReadReceiptGroupGet } from "../../route-functions/groupchat-function-routes/read-receipts-group-routes/handle-read-receipt-group-get.js";

const router = express.Router();

// Create read receipt for group message
router.post(
  "/create",
  validateReadReceiptGroupCreate,
  handleReadReceiptGroupCreate
);

// Get read receipt for group message by ID
router.get(
  "/get/:receiptId",
  validateReadReceiptGroupGet,
  handleReadReceiptGroupGet
);

export default router;
