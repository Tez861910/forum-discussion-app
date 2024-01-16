import { sequelize } from "../../../db.js";

export const handleForumCreate = async (req, res) => {
  const { courseId, forumName, forumDescription, createdByUserId } = req.body;

  try {
    const Forums = sequelize.models.Forums;

    if (!courseId || !forumName || !forumDescription || !createdByUserId) {
      console.log(
        "ForumName, ForumDescription, and CreatedByUserId are required"
      );
      return res.status(400).json({
        error: "ForumName, ForumDescription, and CreatedByUserId are required",
      });
    }

    const result = await Forums.create({
      ForumName: forumName,
      ForumDescription: forumDescription,
      CreatedByUserID: createdByUserId,
      CourseID: courseId,
    });

    if (result) {
      console.log("Forum created successfully");
      res.json({ message: "Forum created successfully" });
    } else {
      console.error("Forum creation failed");
      res.status(500).json({ error: "Forum creation failed" });
    }
  } catch (error) {
    console.error("Error creating forum:", error);
    res
      .status(500)
      .json({ error: "Forum creation failed", details: error.message });
  }
};
