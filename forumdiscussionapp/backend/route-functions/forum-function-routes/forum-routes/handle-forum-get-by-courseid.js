import { sequelize } from "../../../db.js";

export const handleForumGetCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  console.log("Received courseId:", courseId);

  try {
    const Forums = sequelize.models.Forums;

    const results = await Forums.findAll({
      where: { CourseID: courseId },
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
