import express from "express";

import bansRoutes from "../routes/moderation-routes/bans.js";
import userreportsRoutes from "../routes/moderation-routes/user-reports.js";

const router = express.Router();

router.use("/bans", bansRoutes);
router.use("/userreports", userreportsRoutes);

export default router;
