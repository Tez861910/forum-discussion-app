import { sequelize } from "../../../db.js";

export const handleUserResponsesGetAll = async (req, res) => {
  try {
    // Get the UserResponses and CommonAttributes models
    const UserResponses = sequelize.models.UserResponses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Define the association between UserResponses and CommonAttributes
    UserResponses.belongsTo(CommonAttributes, {
      foreignKey: "CommonAttributeID",
      targetKey: "AttributeID",
    });

    // Fetch user responses and include related CommonAttributes with IsDeleted condition
    const result = await UserResponses.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("User responses retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting user responses:", error);
    res
      .status(500)
      .json({ error: "Error getting user responses", details: error.message });
  }
};
