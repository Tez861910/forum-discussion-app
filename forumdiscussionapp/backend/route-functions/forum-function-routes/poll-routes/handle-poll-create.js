import { sequelize } from "../../../db.js";

export const handlePollCreate = async (req, res) => {
  const { question, createdByUserId } = req.body;

  try {
    if (!question || !createdByUserId) {
      console.log("Question and createdByUserId are required");
      return res
        .status(400)
        .json({ error: "Question and createdByUserId are required" });
    }

    const Polls = sequelize.models.Polls;

    const result = await Polls.create({
      PollQuestion: question,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("Poll created successfully");
      res.json({ message: "Poll created successfully" });
    } else {
      console.error("Poll creation failed");
      res.status(500).json({ error: "Poll creation failed" });
    }
  } catch (error) {
    console.error("Error creating poll:", error);
    res
      .status(500)
      .json({ error: "Poll creation failed", details: error.message });
  }
};
