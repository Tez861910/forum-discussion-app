import express from "express";

import refreshtokensRoutes from "../routes/misc/refresh-token.js";

const router = express.Router();

router.use("/refreshtokens", refreshtokensRoutes);

export default router;
