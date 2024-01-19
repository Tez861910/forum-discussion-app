import { sequelize } from "../../../db.js";

export const handleCourseMaterialDelete = async (req, res) => {
  const { materialId, userId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const CourseMaterials = sequelize.models.CourseMaterials;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the course material to be deleted
    const courseMaterial = await CourseMaterials.findOne({
      where: { MaterialID: materialId },
    });

    if (!courseMaterial) {
      console.error("Course material not found");
      return res.status(404).json({ error: "Course material not found" });
    }

    // Get the CommonAttributeID associated with the course material
    const commonAttributeId = courseMaterial.CommonAttributeID;

    // Soft delete by updating the CommonAttributes entry
    await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: commonAttributeId },
      }
    );

    console.log("Course material soft deleted successfully");
    res.json({ message: "Course material soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting course material:", error);
    res.status(500).json({
      error: "Course material soft deletion failed",
      details: error.message,
    });
  }
};
