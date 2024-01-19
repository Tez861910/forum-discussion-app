import { sequelize } from "../../../db.js";

export const handleBanDelete = async (req, res) => {
  const { banId, userId } = req.params;

  try {
    // Dynamically access the Bans and CommonAttributes models using sequelize.models
    const { Bans, CommonAttributes } = sequelize.models;

    // Find the Ban to get the CommonAttributeID
    const ban = await Bans.findOne({
      where: { BanID: banId },
      attributes: ["CommonAttributeID"],
    });

    if (!ban) {
      console.error("Ban not found");
      return res.status(404).json({ error: "Ban not found" });
    }

    const commonAttributeId = ban.CommonAttributeID;

    // Update the IsDeleted record and insert DeletedByUserID in CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: userId },
      { where: { AttributeID: commonAttributeId } }
    );

    console.log("Ban marked as deleted in CommonAttributes");
    res.json({ message: "Ban marked as deleted in CommonAttributes" });
  } catch (error) {
    console.error("Error marking ban as deleted:", error);
    res.status(500).json({
      error: "Error marking ban as deleted",
      details: error.message,
    });
  }
};
