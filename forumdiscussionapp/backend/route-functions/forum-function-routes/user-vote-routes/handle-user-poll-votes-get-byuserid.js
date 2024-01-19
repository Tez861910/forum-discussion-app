import { sequelize } from "../../../db.js";

export const handleUserPollVoteGetByUserId = async (req, res) => {
  // Extracting the userId from the request parameters
  const { userId } = req.params;

  try {
    // Dynamically access the UserPollVotes model using sequelize.models
    const { UserPollVotes, CommonAttributes } = sequelize.models;

    // Using Sequelize's findAll method to retrieve user poll votes with association
    const result = await UserPollVotes.findAll({
      // Specifying the condition for the query: where UserID matches the provided userId
      where: {
        UserID: userId,
      },
      // Including the association with CommonAttributes table
      include: [
        {
          model: CommonAttributes,
          // Specifying the condition for the association: where IsDeleted is false
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    // Logging a success message and sending the retrieved data in the response
    console.log("User poll votes retrieved successfully for userId:", userId);
    res.json(result);
  } catch (error) {
    // Logging an error message and sending an error response in case of any issues
    console.error("Error getting user poll votes for userId:", userId, error);
    res
      .status(500)
      .json({ error: "Error getting user poll votes", details: error.message });
  }
};
