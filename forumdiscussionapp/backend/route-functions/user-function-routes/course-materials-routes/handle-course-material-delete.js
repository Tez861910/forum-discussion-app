import { CourseMaterials } from "../../../db.js";

export const handleCourseMaterialDelete = async (req, res) => {
  const { materialId } = req.params;

  try {
    // Delete the course material
    const result = await CourseMaterials.destroy({
      where: { MaterialID: materialId },
    });

    if (result === 1) {
      console.log("Course material deleted successfully");
      res.json({ message: "Course material deleted successfully" });
    } else {
      console.error("Course material deletion failed");
      res.status(500).json({ error: "Course material deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting course material:", error);
    res
      .status(500)
      .json({
        error: "Course material deletion failed",
        details: error.message,
      });
  }
};
