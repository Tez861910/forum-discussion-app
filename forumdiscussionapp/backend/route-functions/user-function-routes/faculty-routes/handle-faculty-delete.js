import { FacultyMembers } from "../../../db.js";

export const handleFacultyDelete = async (req, res) => {
  const { facultyId } = req.params;

  try {
    // Delete the faculty member
    const result = await FacultyMembers.destroy({
      where: { FacultyID: facultyId },
    });

    if (result === 1) {
      console.log("Faculty member deleted successfully");
      res.json({ message: "Faculty member deleted successfully" });
    } else {
      console.error("Faculty member deletion failed");
      res.status(500).json({ error: "Faculty member deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting faculty member:", error);
    res
      .status(500)
      .json({
        error: "Faculty member deletion failed",
        details: error.message,
      });
  }
};
