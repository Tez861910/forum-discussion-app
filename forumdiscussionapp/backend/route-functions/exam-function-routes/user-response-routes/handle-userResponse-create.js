import { sequelize } from "../../../db.js";

export const handleUserResponseCreate = async (req, res) => {
  const { userId, questionId, answerId } = req.body;

  try {
    if (!userId || !questionId || !answerId) {
      console.log("UserID, QuestionID, and AnswerID are required");
      return res.status(400).json({
        error: "UserID, QuestionID, and AnswerID are required",
      });
    }

    const UserResponses = sequelize.models.UserResponses;
    const newUserResponse = await UserResponses.create({
      UserID: userId,
      QuestionID: questionId,
      AnswerID: answerId,
    });

    if (newUserResponse) {
      console.log("User response created successfully");
      res.json({ message: "User response created successfully" });
    } else {
      console.error("User response creation failed");
      res.status(500).json({ error: "User response creation failed" });
    }
  } catch (error) {
    console.error("Error creating user response:", error);
    res
      .status(500)
      .json({ error: "User response creation failed", details: error.message });
  }
};
