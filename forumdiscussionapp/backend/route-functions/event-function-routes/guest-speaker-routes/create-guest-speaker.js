import { sequelize } from "../../../db.js";

export const createGuestSpeaker = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { SpeakerName, ContributionDescription } = req.body;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const GuestSpeakers = sequelize.models.GuestSpeakers;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: UserID,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.get("AttributeID");

    // Insert into GuestSpeakers table using CommonAttributeID
    await GuestSpeakers.create({
      EventID: eventId,
      SpeakerName,
      ContributionDescription,
      CommonAttributeID: commonAttributeID,
    });

    res.status(201).json({
      success: true,
      message: "Guest speaker created successfully",
    });
  } catch (error) {
    console.error("Error creating guest speaker:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
