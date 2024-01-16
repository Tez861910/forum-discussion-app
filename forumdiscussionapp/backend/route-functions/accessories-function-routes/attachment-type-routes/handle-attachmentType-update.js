import { sequelize } from "../../../db.js";

export const handleAttachmentTypeUpdate = async (req, res) => {
  const { attachmentTypeId } = req.params;
  const { attachmentTypeName } = req.body;
  const AttachmentTypes = sequelize.models.AttachmentTypes;

  try {
    if (!attachmentTypeName) {
      console.log("AttachmentTypeName is required");
      return res.status(400).json({
        error: "AttachmentTypeName is required",
      });
    }

    const result = await AttachmentTypes.update(
      {
        AttachmentTypeName: attachmentTypeName,
      },
      {
        where: {
          AttachmentTypeID: attachmentTypeId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("Attachment type updated successfully");
      res.json({ message: "Attachment type updated successfully" });
    } else {
      console.error("Attachment type update failed");
      res.status(500).json({ error: "Attachment type update failed" });
    }
  } catch (error) {
    console.error("Error updating attachment type:", error);
    res
      .status(500)
      .json({ error: "Attachment type update failed", details: error.message });
  }
};
