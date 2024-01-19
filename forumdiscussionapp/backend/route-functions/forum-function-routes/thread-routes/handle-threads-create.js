import { sequelize } from "../../../db.js";

export const handleThreadsCreate = async (req, res) => {
  const { title, content, forumId, userId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Threads = sequelize.models.Threads;

    // Step 1: Create a CommonAttributes entry
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    if (!commonAttributesResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    // Step 2: Create a Threads entry with CommonAttributeID
    const result = await Threads.create({
      ThreadTitle: title,
      ThreadContent: content,
      ForumID: forumId,
      UserID: userId,
      CommonAttributeID: commonAttributesResult.AttributeID,
    });

    if (result) {
      console.log("Thread created successfully");
      res.json({ message: "Thread created successfully" });
    } else {
      console.error("Thread creation failed");
      res.status(500).json({ error: "Thread creation failed" });
    }
  } catch (error) {
    console.error("Error creating thread:", error);
    res
      .status(500)
      .json({ error: "Thread creation failed", details: error.message });
  }
};
