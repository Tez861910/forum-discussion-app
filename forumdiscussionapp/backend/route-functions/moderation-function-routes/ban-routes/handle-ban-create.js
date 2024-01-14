import { Bans } from "../../../db.js";

export const handleBanCreate = async (req, res) => {
  const { bannedUserId, bannedByUserId, banReason, banExpiresAt } = req.body;

  try {
    if (!bannedUserId || !bannedByUserId || !banReason) {
      console.log("BannedUserId, BannedByUserId, and BanReason are required");
      return res.status(400).json({
        error: "BannedUserId, BannedByUserId, and BanReason are required",
      });
    }

    // Create a new Ban
    const ban = await Bans.create({
      BannedUserID: bannedUserId,
      BannedByUserID: bannedByUserId,
      BanReason: banReason,
      BanExpiresAt: banExpiresAt,
    });

    console.log("Ban created successfully");
    res.json({ message: "Ban created successfully" });
  } catch (error) {
    console.error("Error creating ban:", error);
    res
      .status(500)
      .json({ error: "Ban creation failed", details: error.message });
  }
};
