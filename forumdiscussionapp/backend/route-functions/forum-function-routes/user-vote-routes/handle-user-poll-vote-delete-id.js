import { sequelize } from "../../../db.js";

export const handleUserPollVoteDeleteById = async (req, res) => {
  const { userPollVoteId } = req.params;

  try {
    const UserPollVotes = sequelize.models.UserPollVotes;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Step 1: Find CommonAttributeID associated with UserPollVoteID
    const userPollVote = await UserPollVotes.findByPk(userPollVoteId);
    const commonAttributeId = userPollVote.CommonAttributeID;

    // Step 2: Update CommonAttributes for isdeleted and deletedbyuserid
    const commonAttributesResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userPollVote.UserID,
      },
      { where: { AttributeID: commonAttributeId } }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("User poll vote deleted successfully");
      res.json({ message: "User poll vote deleted successfully" });
    } else {
      console.error("User poll vote deletion failed");
      res.status(500).json({ error: "User poll vote deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting user poll vote:", error);
    res
      .status(500)
      .json({ error: "Error deleting user poll vote", details: error.message });
  }
};
