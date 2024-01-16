import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const editGuestSpeaker = async (req, res) => {
  try {
    const { eventId, guestSpeakerId } = req.params;
    const { UpdatedSpeakerName, UpdatedContributionDescription } = req.body;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const GuestSpeakers = sequelize.models.GuestSpeakers;

    // Update the SpeakerName and ContributionDescription in the GuestSpeakers table
    await GuestSpeakers.update(
      {
        SpeakerName: UpdatedSpeakerName,
        ContributionDescription: UpdatedContributionDescription,
      },
      { where: { EventID: eventId, SpeakerID: guestSpeakerId } }
    );

    // Update the CommonAttributes table with the updated information
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

    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({ success: true, message: "Guest speaker updated successfully" });
  } catch (error) {
    console.error("Error updating guest speaker:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating guest speaker" });
  }
};
