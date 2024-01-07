import { query } from "../../../db.js";

export const handleCourseMaterialCreate = async (req, res) => {
  const { courseId, materialName, materialType, filePath, description } =
    req.body;

  try {
    const sql =
      "INSERT INTO CourseMaterials (CourseID, MaterialName, MaterialType, FilePath, Description) VALUES (?, ?, ?, ?, ?)";
    const [result] = await query(sql, [
      courseId,
      materialName,
      materialType,
      filePath,
      description,
    ]);

    if (result.affectedRows === 1) {
      console.log("Course material created successfully");
      res.json({ message: "Course material created successfully" });
    } else {
      console.error("Course material creation failed");
      res.status(500).json({ error: "Course material creation failed" });
    }
  } catch (error) {
    console.error("Error creating course material:", error);
    res.status(500).json({
      error: "Course material creation failed",
      details: error.message,
    });
  }
};
