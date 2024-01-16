import { sequelize } from "../../../db.js";

export const handleAttachmentTypeDelete = async (req, res) => {
  const { attachmentTypeId } = req.params;
  const AttachmentTypes = sequelize.models.AttachmentTypes;

  try {
    const result = await AttachmentTypes.destroy({
      where: {
        AttachmentTypeID: attachmentTypeId,
      },
    });

    if (result === 1) {
      console.log("Attachment type deleted successfully");
      res.json({ message: "Attachment type deleted successfully" });
    } else {
      console.error("Attachment type deletion failed");
      res.status(500).json({ error: "Attachment type deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting attachment type:", error);
    res.status(500).json({
      error: "Attachment type deletion failed",
      details: error.message,
    });
  }
};
