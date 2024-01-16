import { sequelize } from "../../../db.js";

export const handleAttachmentDelete = async (req, res) => {
  const { attachmentId } = req.params;
  const Attachments = sequelize.models.Attachments;

  try {
    const result = await Attachments.destroy({
      where: {
        AttachmentID: attachmentId,
      },
    });

    if (result === 1) {
      console.log("Attachment deleted successfully");
      res.json({ message: "Attachment deleted successfully" });
    } else {
      console.error("Attachment deletion failed");
      res.status(500).json({ error: "Attachment deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting attachment:", error);
    res
      .status(500)
      .json({ error: "Attachment deletion failed", details: error.message });
  }
};
