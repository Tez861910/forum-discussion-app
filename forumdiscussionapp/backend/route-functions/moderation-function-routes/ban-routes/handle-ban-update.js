import { Bans } from "../../../db.js";

export const handleBanUpdate = async (req, res) => {
  const { banId } = req.params;
  const { bannedUserId, bannedByUserId, banReason, banExpiresAt } = req.body;

  try {
    if (!bannedUserId || !bannedByUserId || !banReason) {
      console.log("BannedUserId, BannedByUserId, and BanReason are required");
      return res.status(400).json({
        error: "BannedUserId, BannedByUserId, and BanReason are required",
      });
    }

    const result = await Bans.update(
      {
        BannedUserID: bannedUserId,
        BannedByUserID: bannedByUserId,
        BanReason: banReason,
        BanExpiresAt: banExpiresAt,
      },
      { where: { BanID: banId } }
    );

    if (result[0] === 1) {
      console.log("Ban updated successfully");
      res.json({ message: "Ban updated successfully" });
    } else {
      console.error("Ban update failed");
      res.status(500).json({ error: "Ban update failed" });
    }
  } catch (error) {
    console.error("Error updating ban:", error);
    res
      .status(500)
      .json({ error: "Ban update failed", details: error.message });
  }
};
