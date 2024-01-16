import { sequelize } from "../../../db.js";

export const handleUserResponseUpdateById = async (req, res) => {
  const { userResponseId } = req.params;
  const { userId, questionId, answerId } = req.body;

  try {
    const UserResponses = sequelize.models.UserResponses;
    const result = await UserResponses.update(
      {
        UserID: userId,
        QuestionID: questionId,
        AnswerID: answerId,
      },
      {
        where: { UserResponseID: userResponseId },
      }
    );

    if (result[0] === 1) {
      console.log("User response updated successfully");
      res.json({ message: "User response updated successfully" });
    } else {
      console.error("User response update failed");
      res.status(500).json({ error: "User response update failed" });
    }
  } catch (error) {
    console.error("Error updating user response:", error);
    res
      .status(500)
      .json({ error: "User response update failed", details: error.message });
  }
};
