import { sequelize } from "../../../db.js";

export const handleUserPollVoteDeleteById = async (req, res) => {
  const { userPollVoteId } = req.params;

  try {
    const UserPollVotes = sequelize.models.UserPollVotes;

    const result = await UserPollVotes.destroy({
      where: {
        UserPollVoteID: userPollVoteId,
      },
    });

    if (result === 1) {
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
