import { sequelize } from "../../../db.js";

export const handleCourseMaterialGet = async (req, res) => {
  const { materialId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const CourseMaterials = sequelize.models.CourseMaterials;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the course material with associated CommonAttributes
    const courseMaterial = await CourseMaterials.findOne({
      where: { MaterialID: materialId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
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
    res.status(500).json({
      error: "Error getting course material",
      details: error.message,
    });
  }
};
