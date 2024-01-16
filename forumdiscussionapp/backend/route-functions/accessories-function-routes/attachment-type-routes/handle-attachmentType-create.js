import { sequelize } from "../../../db.js";

export const handleAttachmentTypeCreate = async (req, res) => {
  const { attachmentTypeName } = req.body;
  const AttachmentTypes = sequelize.models.AttachmentTypes;

  try {
    if (!attachmentTypeName) {
      console.log("AttachmentTypeName is required");
      return res.status(400).json({
        error: "AttachmentTypeName is required",
      });
    }

    const result = await AttachmentTypes.create({
      AttachmentTypeName: attachmentTypeName,
    });

    if (result) {
      console.log("Attachment type created successfully");
      res.json({ message: "Attachment type created successfully" });
    } else {
      console.error("Attachment type creation failed");
      res.status(500).json({ error: "Attachment type creation failed" });
    }
  } catch (error) {
    console.error("Error creating attachment type:", error);
    res.status(500).json({
      error: "Attachment type creation failed",
      details: error.message,
    });
  }
};
