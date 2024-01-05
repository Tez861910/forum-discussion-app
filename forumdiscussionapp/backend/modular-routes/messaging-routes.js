import express from "express";
import { handleError } from "../authvalid.js";

import userstatusRoutes from "../routes/messaging-routes/user-status.js";
import friendrequestsRoutes from "../routes/messaging-routes/friend-requests.js";
import friendsRoutes from "../routes/messaging-routes/friends.js";
import privatemessagesRoutes from "../routes/messaging-routes/private-messages.js";
import readreceiptsRoutes from "../routes/messaging-routes/read-receipts.js";
import realtimeupdatesRoutes from "../routes/messaging-routes/real-time-updates.js";

const router = express.Router();

router.use("/userstatus", userstatusRoutes);
router.use("/friendrequests", friendrequestsRoutes);
router.use("/friends", friendsRoutes);
router.use("/privatemessages", privatemessagesRoutes);
router.use("/readreceipts", readreceiptsRoutes);
router.use("/realtimeupdates", realtimeupdatesRoutes);

// Error handling middleware
router.use(handleError);

export default router;
