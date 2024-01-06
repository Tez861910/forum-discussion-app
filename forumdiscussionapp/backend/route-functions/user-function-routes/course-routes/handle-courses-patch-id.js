import { query } from "../../../db.js";

export const handleCoursesPatchId = async (req, res) => {
  const deletedByUserID = req.user.id;

  try {
    const { id } = req.params;

    // Updated SQL query to use CommonAttributeID for soft deletion
    const updateSql = `
      UPDATE Courses AS C
      INNER JOIN CommonAttributes AS CA ON C.CommonAttributeID = CA.AttributeID
      SET CA.IsDeleted = TRUE, CA.DeletedAt = CURRENT_TIMESTAMP, CA.DeletedByUserID = ?
      WHERE C.CourseID = ? AND CA.IsDeleted = FALSE
    `;

    const [result] = await query(updateSql, [deletedByUserID, id]);

    if (result.affectedRows === 1) {
      console.log("Course soft-deleted successfully");
      res.json({ message: "Course soft-deleted successfully" });
    } else {
      console.error("Course soft-deletion failed");
      res.status(500).json({ error: "Course soft-deletion failed" });
    }
  } catch (error) {
    console.error("Error soft-deleting course:", error);
    res
      .status(500)
      .json({ error: "Course soft-deletion failed", details: error.message });
  }
};
