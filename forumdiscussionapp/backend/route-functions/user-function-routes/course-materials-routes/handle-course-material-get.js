import { sequelize } from "../../../db.js";

export const handleCourseMaterialGet = async (req, res) => {
  const { materialId } = req.params;

  try {
    // Dynamically access the CourseMaterials model using sequelize.models
    const CourseMaterials = sequelize.models.CourseMaterials;

    const courseMaterial = await CourseMaterials.findOne({
      where: { MaterialID: materialId },
    });

    if (courseMaterial) {
      console.log("Course material retrieved successfully");
      res.json({ courseMaterial });
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
