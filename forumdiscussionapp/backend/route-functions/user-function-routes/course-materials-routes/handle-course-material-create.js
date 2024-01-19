import { sequelize } from "../../../db.js";

export const handleCourseMaterialCreate = async (req, res) => {
  const {
    userId,
    courseId,
    materialName,
    materialType,
    filePath,
    description,
  } = req.body;

  try {
    // Dynamically access the models using sequelize.models
    const CommonAttributes = sequelize.models.CommonAttributes;
    const CourseMaterials = sequelize.models.CourseMaterials;

    // Create a new CommonAttributes entry
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    // Use the obtained AttributeID in CourseMaterials creation
    const courseMaterial = await CourseMaterials.create({
      CommonAttributeID: commonAttribute.AttributeID,
      CourseID: courseId,
      MaterialName: materialName,
      MaterialType: materialType,
      FilePath: filePath,
      Description: description,
    });

    console.log("Course material created successfully");
    res.json({ message: "Course material created successfully" });
  } catch (error) {
    console.error("Error creating course material:", error);
    res.status(500).json({
      error: "Course material creation failed",
      details: error.message,
    });
  }
};
