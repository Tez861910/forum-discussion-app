import { CourseMaterials } from "../../../db.js";

export const handleCourseMaterialCreate = async (req, res) => {
  const { courseId, materialName, materialType, filePath, description } =
    req.body;

  try {
    // Create a new CourseMaterial
    const courseMaterial = await CourseMaterials.create({
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
    res
      .status(500)
      .json({
        error: "Course material creation failed",
        details: error.message,
      });
  }
};
