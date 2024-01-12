import express from "express";

import announcementsRoutes from "../routes/alert-routes/announcements.js";
import notificationsRoutes from "../routes/alert-routes/notifications.js";

const router = express.Router();

router.use("/announcements", announcementsRoutes);
router.use("/notifications", notificationsRoutes);

export default router;
