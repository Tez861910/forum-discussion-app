import { CourseMaterials } from "../../../db.js";

export const handleCourseMaterialUpdate = async (req, res) => {
  const { materialId } = req.params;
  const { materialName, materialType, filePath, description } = req.body;

  try {
    // Update the course material
    const [numberOfAffectedRows, affectedRows] = await CourseMaterials.update(
      {
        MaterialName: materialName,
        MaterialType: materialType,
        FilePath: filePath,
        Description: description,
      },
      {
        where: { MaterialID: materialId },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 1) {
      console.log("Course material updated successfully");
      res.json({
        message: "Course material updated successfully",
        courseMaterial: affectedRows[0],
      });
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
