import express from "express";

import useractivitylogsRoutes from "../routes/activity-routes/user-activity-logs.js";
import usersettingsRoutes from "../routes/activity-routes/user-settings.js";

const router = express.Router();

router.use("/useractivitylogs", useractivitylogsRoutes);
router.use("/usersettings", usersettingsRoutes);

export default router;
