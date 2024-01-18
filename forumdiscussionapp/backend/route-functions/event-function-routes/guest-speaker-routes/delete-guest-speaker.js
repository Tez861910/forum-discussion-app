import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const softDeleteGuestSpeaker = async (req, res) => {
  try {
    const { eventId, guestSpeakerId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const GuestSpeakers = sequelize.models.GuestSpeakers;

    // Check if the guest speaker is already deleted
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("GuestSpeakers.CommonAttributeID") },
      include: [
        {
          model: GuestSpeakers,
          where: { EventID: eventId, SpeakerID: guestSpeakerId },
          attributes: [],
        },
      ],
    });

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the guest speaker is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Guest speaker already deleted",
      });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({
      success: true,
      message: "Guest speaker soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting guest speaker:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting guest speaker" });
  }
};
