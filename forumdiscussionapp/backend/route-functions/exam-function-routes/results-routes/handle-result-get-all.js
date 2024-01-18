import { sequelize } from "../../../db.js";

export const handleResultGetAll = async (req, res) => {
  try {
    // Get the Results model and define the association with CommonAttributes
    const Results = sequelize.models.Results;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Define the association between Results and CommonAttributes
    Results.belongsTo(CommonAttributes, {
      foreignKey: "CommonAttributeID",
      targetKey: "AttributeID",
    });

    // Fetch results and include related CommonAttributes with IsDeleted condition
    const result = await Results.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Exam results retrieved successfully");
    res.json({ examResults: result });
  } catch (error) {
    console.error("Error getting exam results:", error);
    res
      .status(500)
      .json({ error: "Error getting exam results", details: error.message });
  }
};
