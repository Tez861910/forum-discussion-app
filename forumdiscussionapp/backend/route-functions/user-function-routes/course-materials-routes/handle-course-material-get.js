import { query } from "../../../db.js";

export const handleCourseMaterialGet = async (req, res) => {
  const { materialId } = req.params;

  try {
    const sql = "SELECT * FROM CourseMaterials WHERE MaterialID = ?";
    const [result] = await query(sql, [materialId]);

    if (result.length > 0) {
      console.log("Course material retrieved successfully");
      res.json({ courseMaterial: result[0] });
    } else {
      console.error("Course material not found");
      res.status(404).json({ error: "Course material not found" });
    }
  } catch (error) {
    console.error("Error getting course material:", error);
    res
      .status(500)
      .json({ error: "Error getting course material", details: error.message });
  }
};
