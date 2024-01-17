import { sequelize } from "../../../db.js";

export const handleAttachmentUpdate = async (req, res) => {
  const Attachments = sequelize.models.Attachments;
  const CommonAttributes = sequelize.models.CommonAttributes;
  const { attachmentId } = req.params;
  const {
    filePath,
    attachedByUserId,
    attachmentTypeId,
    attachedToType,
    attachedToId,
    description,
  } = req.body;

  try {
    if (
      !filePath ||
      !attachedByUserId ||
      !attachmentTypeId ||
      !attachedToType ||
      !attachedToId
    ) {
      console.log(
        "FilePath, AttachedByUserId, AttachmentTypeId, AttachedToType, and AttachedToId are required"
      );
      return res.status(400).json({
        error:
          "FilePath, AttachedByUserId, AttachmentTypeId, AttachedToType, and AttachedToId are required",
      });
    }

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

    // Update CommonAttributes entry's UpdatedByUserID
    await CommonAttributes.update(
      {
        UpdatedByUserID: attachedByUserId,
      },
      {
        where: {
          AttributeID: commonAttributeId,
        },
      }
    );

    // Update Attachments entry
    const result = await Attachments.update(
      {
        FilePath: filePath,
        AttachedByUserID: attachedByUserId,
        AttachmentTypeID: attachmentTypeId,
        AttachedToType: attachedToType,
        AttachedToID: attachedToId,
        Description: description,
      },
      {
        where: {
          AttachmentID: attachmentId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("Attachment updated successfully");
      res.json({ message: "Attachment updated successfully" });
    } else {
      console.error("Attachment update failed");
      res.status(500).json({ error: "Attachment update failed" });
    }
  } catch (error) {
    console.error("Error updating attachment:", error);
    res
      .status(500)
      .json({ error: "Attachment update failed", details: error.message });
  }
};
