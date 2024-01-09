import { query } from "../../../db.js";

export const handleThreadsGetCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  console.log("Received courseId:", courseId);

  try {
    const sql = "SELECT * FROM Forums WHERE CourseID = ?";
    const results = await query(sql, [courseId]);
    console.log("Forums data:", results);

    res.json(results);
  } catch (error) {
    console.error("Error fetching forums:", error);
    res
      .status(500)
      .json({ error: "Forum retrieval failed", details: error.message });
  }
};
