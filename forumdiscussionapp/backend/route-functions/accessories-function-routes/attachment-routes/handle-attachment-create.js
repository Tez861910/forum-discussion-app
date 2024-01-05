import { query } from "../../../db.js";

export const handleAttachmentCreate = async (req, res) => {
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

    const sql =
      "INSERT INTO Attachments (FilePath, AttachedByUserID, AttachmentTypeID, AttachedToType, AttachedToID, Description) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await query(sql, [
      filePath,
      attachedByUserId,
      attachmentTypeId,
      attachedToType,
      attachedToId,
      description,
    ]);

    if (result.affectedRows === 1) {
      console.log("Attachment created successfully");
      res.json({ message: "Attachment created successfully" });
    } else {
      console.error("Attachment creation failed");
      res.status(500).json({ error: "Attachment creation failed" });
    }
  } catch (error) {
    console.error("Error creating attachment:", error);
    res
      .status(500)
      .json({ error: "Attachment creation failed", details: error.message });
  }
};
