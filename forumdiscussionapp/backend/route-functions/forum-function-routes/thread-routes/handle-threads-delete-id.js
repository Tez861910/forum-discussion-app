import { sequelize } from "../../../db.js";

export const handleThreadsDeleteId = async (req, res) => {
  const { threadId } = req.params;
  const { userId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Threads = sequelize.models.Threads;

    // Step 1: Find the Thread and associated CommonAttributeID
    const thread = await Threads.findByPk(threadId);

    if (!thread) {
      console.error("Thread not found");
      return res.status(404).json({ error: "Thread not found" });
    }

    const commonAttributeId = thread.CommonAttributeID;

    // Step 2: Update CommonAttributes for soft delete
    const commonAttributesResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: commonAttributeId },
      }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Thread soft deleted successfully");
      res.json({ message: "Thread soft deleted successfully" });
    } else {
      console.error("Thread soft deletion failed");
      res.status(500).json({ error: "Thread soft deletion failed" });
    }
  } catch (error) {
    console.error("Error soft deleting thread:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
