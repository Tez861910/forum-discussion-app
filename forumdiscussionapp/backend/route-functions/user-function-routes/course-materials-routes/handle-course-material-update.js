import { sequelize } from "../../../db.js";

export const handleCourseMaterialUpdate = async (req, res) => {
  const { materialId } = req.params;
  const { userId, materialName, materialType, filePath, description } =
    req.body;

  try {
    // Dynamically access the models using sequelize.models
    const CourseMaterials = sequelize.models.CourseMaterials;
    const CommonAttributes = sequelize.models.CommonAttributes;

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
      const updatedCourseMaterial = affectedRows[0];

      // Update the associated CommonAttributes entry with UpdatedByUserID
      await CommonAttributes.update(
        {
          UpdatedByUserID: userId,
        },
        {
          where: { AttributeID: updatedCourseMaterial.CommonAttributeID },
        }
      );

      console.log("Course material updated successfully");
      res.json({
        message: "Course material updated successfully",
        courseMaterial: updatedCourseMaterial,
      });
    } else {
      console.error("Course material update failed");
      res.status(500).json({ error: "Course material update failed" });
    }
  } catch (error) {
    console.error("Error updating course material:", error);
    res.status(500).json({
      error: "Course material update failed",
      details: error.message,
    });
  }
};
