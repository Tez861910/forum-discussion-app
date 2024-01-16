import { sequelize } from "../../../db.js";

export const handleAttachmentGetAll = async (req, res) => {
  const Attachments = sequelize.models.Attachments;
  try {
    const result = await Attachments.findAll();

    console.log("Attachments retrieved successfully");
    res.json({ attachments: result });
  } catch (error) {
    console.error("Error getting attachments:", error);
    res
      .status(500)
      .json({ error: "Error getting attachments", details: error.message });
  }
};
