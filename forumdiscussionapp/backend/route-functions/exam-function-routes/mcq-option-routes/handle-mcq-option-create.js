import { sequelize } from "../../../db.js";

export const handleMCQOptionCreate = async (req, res) => {
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const MCQOptions = sequelize.models.MCQOptions;

    // Insert CreatedByUserID into CommonAttributes table
    const commonAttributesInstance = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    // Use CommonAttributeID from CommonAttributes table as CommonAttributeID in MCQOptions table
    const result = await MCQOptions.create({
      CommonAttributeID: commonAttributesInstance.get("AttributeID"),
      MCQQuestionID: mcqQuestionId,
      MCQOptionText: mcqOptionText,
      IsCorrect: isCorrect,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("MCQ option created successfully");
      res.json({ message: "MCQ option created successfully" });
    } else {
      console.error("MCQ option creation failed");
      res.status(500).json({ error: "MCQ option creation failed" });
    }
  } catch (error) {
    console.error("Error creating MCQ option:", error);
    res
      .status(500)
      .json({ error: "MCQ option creation failed", details: error.message });
  }
};
