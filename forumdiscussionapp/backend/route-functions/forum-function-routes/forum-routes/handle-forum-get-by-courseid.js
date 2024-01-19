import { sequelize } from "../../../db.js";

export const handleForumGetCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  console.log("Received courseId:", courseId);

  try {
    // Get the Forums and CommonAttributes models
    const Forums = sequelize.models.Forums;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch forums for a specific course and include related CommonAttributes with IsDeleted condition
    const results = await Forums.findAll({
      where: { CourseID: courseId },
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Forums data:", results);

    res.json(results);
  } catch (error) {
    console.error("Error fetching forums:", error);
    res
      .status(500)
      .json({ error: "Forum retrieval failed", details: error.message });
  }
};
