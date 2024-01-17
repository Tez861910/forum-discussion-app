import { sequelize } from "../../../db.js";

export const handleAttachmentDelete = async (req, res) => {
  const { attachmentId } = req.params;
  const Attachments = sequelize.models.Attachments;
  const CommonAttributes = sequelize.models.CommonAttributes;
  const { deletedByUserId } = req.body;

  try {
    // Find the Attachment by ID
    const attachment = await Attachments.findOne({
      where: {
        AttachmentID: attachmentId,
      },
    });

    // Check if the attachment exists
    if (!attachment) {
      console.error("Attachment not found");
      return res.status(404).json({ error: "Attachment not found" });
    }

    // Retrieve CommonAttributeID from the Attachment
    const commonAttributeId = attachment.CommonAttributeID;

    // Update IsDeleted status and DeletedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: deletedByUserId,
      },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Attachment marked as deleted successfully");
      res.json({ message: "Attachment marked as deleted successfully" });
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
