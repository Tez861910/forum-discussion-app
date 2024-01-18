import { sequelize } from "../../../db.js";

export const handlePollOptionCreate = async (req, res) => {
  const { pollId, optionText, userId } = req.body;

  try {
    if (!pollId || !optionText) {
      console.log("PollID and OptionText are required");
      return res
        .status(400)
        .json({ error: "PollID and OptionText are required" });
    }

    const PollOptions = sequelize.models.PollOptions;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Insert a record into CommonAttributes table to get AttributeID
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    // Use the AttributeID obtained from CommonAttributes for PollOptions creation
    const result = await PollOptions.create({
      PollID: pollId,
      OptionText: optionText,
      CommonAttributeID: commonAttribute.AttributeID,
    });

    if (result) {
      console.log("Poll option created successfully");
      res.json({ message: "Poll option created successfully" });
    } else {
      console.error("Poll option creation failed");
      res.status(500).json({ error: "Poll option creation failed" });
    }
  } catch (error) {
    console.error("Error creating poll option:", error);
    res
      .status(500)
      .json({ error: "Poll option creation failed", details: error.message });
  }
};
