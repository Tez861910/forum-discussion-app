import { sequelize } from "../../../db.js";

export const handleMCQOptionsGetAll = async (req, res) => {
  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const MCQOptions = sequelize.models.MCQOptions;

    // Find all MCQOptions with corresponding CommonAttributes not marked as deleted
    const result = await MCQOptions.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    console.log("MCQ options retrieved successfully");
    res.json({ success: true, mcqOptions: result });
  } catch (error) {
    console.error("Error getting MCQ options:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Error getting MCQ options",
        details: error.message,
      });
  }
};
