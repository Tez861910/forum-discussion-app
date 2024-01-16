import { sequelize } from "../../../db.js";

export const handleAttachmentTypeGetAll = async (req, res) => {
  const AttachmentTypes = sequelize.models.AttachmentTypes;
  try {
    const result = await AttachmentTypes.findAll();

    console.log("Attachment types retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting attachment types:", error);
    res.status(500).json({
      error: "Error getting attachment types",
      details: error.message,
    });
  }
};
