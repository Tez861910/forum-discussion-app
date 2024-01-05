import express from "express";
import { verifyJwt } from "../../authvalid.js";
import {
  validateReadReceiptGroupCreate,
  validateReadReceiptGroupGet,
} from "../../body-validation/groupchat-validation-functions/read-receipts-group-validation.js";

import { handleReadReceiptGroupCreate } from "../../route-functions/groupchat-function-routes/read-receipts-group-routes/handle-read-receipt-group-create.js";
import { handleReadReceiptGroupGet } from "../../route-functions/groupchat-function-routes/read-receipts-group-routes/handle-read-receipt-group-get.js";

const router = express.Router();

router.use(express.json());

// Create read receipt for group message
router.post(
  "/create",
  verifyJwt,
  validateReadReceiptGroupCreate,
  handleReadReceiptGroupCreate
);

// Get read receipt for group message by ID
router.get(
  "/get/:receiptId",
  verifyJwt,
  validateReadReceiptGroupGet,
  handleReadReceiptGroupGet
);

export default router;
