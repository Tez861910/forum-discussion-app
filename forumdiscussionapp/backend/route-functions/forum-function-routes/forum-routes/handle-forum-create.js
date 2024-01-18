import { sequelize } from "../../../db.js";

export const handleForumCreate = async (req, res) => {
  const { courseId, forumName, forumDescription, createdByUserId } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      if (!courseId || !forumName || !forumDescription || !createdByUserId) {
        console.log(
          "ForumName, ForumDescription, and CreatedByUserId are required"
        );
        return res.status(400).json({
          error:
            "ForumName, ForumDescription, and CreatedByUserId are required",
        });
      }

      // Get the Forums and CommonAttributes models
      const Forums = sequelize.models.Forums;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Create a new entry in CommonAttributes with CreatedByUserID
      const commonAttributesResult = await CommonAttributes.create(
        {
          CreatedByUserID: createdByUserId,
        },
        { transaction }
      );

      // Extract the AttributeID from the created entry
      const commonAttributeId = commonAttributesResult.AttributeID;

      // Create a new forum with CommonAttributeID
      const result = await Forums.create(
        {
          ForumName: forumName,
          ForumDescription: forumDescription,
          CommonAttributeID: commonAttributeId,
          CourseID: courseId,
        },
        { transaction }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("Forum created successfully");
      res.json({ message: "Forum created successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error creating forum:", error);
      res
        .status(500)
        .json({ error: "Forum creation failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
