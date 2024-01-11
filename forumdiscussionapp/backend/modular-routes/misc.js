import express from "express";
import { handleError } from "../authvalid.js";

import refreshtokensRoutes from "../routes/misc/refresh-token.js";

const router = express.Router();

router.use("/refreshtokens", refreshtokensRoutes);

// Error handling middleware
router.use(handleError);

export default router;
