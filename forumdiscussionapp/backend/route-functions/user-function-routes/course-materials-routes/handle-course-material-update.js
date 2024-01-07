import { query } from "../../../db.js";

export const handleCourseMaterialUpdate = async (req, res) => {
  const { materialId } = req.params;
  const { materialName, materialType, filePath, description } = req.body;

  try {
    const sql =
      "UPDATE CourseMaterials SET MaterialName = ?, MaterialType = ?, FilePath = ?, Description = ? WHERE MaterialID = ?";
    const [result] = await query(sql, [
      materialName,
      materialType,
      filePath,
      description,
      materialId,
    ]);

    if (result.affectedRows === 1) {
      console.log("Course material updated successfully");
      res.json({ message: "Course material updated successfully" });
    } else {
      console.error("Course material update failed");
      res.status(500).json({ error: "Course material update failed" });
    }
  } catch (error) {
    console.error("Error updating course material:", error);
    res
      .status(500)
      .json({ error: "Course material update failed", details: error.message });
  }
};
