import { sequelize } from "../../../db.js";

export const handlePollCreate = async (req, res) => {
  const { question, createdByUserId } = req.body;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!question || !createdByUserId) {
      console.log("Question and createdByUserId are required");
      return res
        .status(400)
        .json({ error: "Question and createdByUserId are required" });
    }

    // Insert CreatedByUserID into CommonAttributes table
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    const Polls = sequelize.models.Polls;

    // Insert Poll data with CommonAttributeID from the created CommonAttributes record
    const result = await Polls.create({
      PollQuestion: question,
      CreatedByUserID: createdByUserId,
      CommonAttributeID: commonAttribute.AttributeID,
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
