import { sequelize } from "../../../db.js";

export const handleUserPollVoteCreate = async (req, res) => {
  const { userId, pollOptionId } = req.body;

  try {
    if (!userId || !pollOptionId) {
      console.log("UserID and PollOptionID are required");
      return res
        .status(400)
        .json({ error: "UserID and PollOptionID are required" });
    }

    const CommonAttributes = sequelize.models.CommonAttributes;
    const UserPollVotes = sequelize.models.UserPollVotes;

    // Step 1: Create CommonAttribute entry
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    // Step 2: Create UserPollVotes with CommonAttributeID
    const result = await UserPollVotes.create({
      UserID: userId,
      PollOptionID: pollOptionId,
      CommonAttributeID: commonAttribute.AttributeID,
    });

    if (result) {
      console.log("User poll vote created successfully");
      res.json({ message: "User poll vote created successfully" });
    } else {
      console.error("User poll vote creation failed");
      res.status(500).json({ error: "User poll vote creation failed" });
    }
  } catch (error) {
    console.error("Error creating user poll vote:", error);
    res.status(500).json({
      error: "User poll vote creation failed",
      details: error.message,
    });
  }
};
