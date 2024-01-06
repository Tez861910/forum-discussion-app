import { query } from "../../../db.js";

export const handleFacultyGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM FacultyMembers";
    const [result] = await query(sql);

    console.log("Faculty members retrieved successfully");
    res.json({ facultyMembers: result });
  } catch (error) {
    console.error("Error getting faculty members:", error);
    res
      .status(500)
      .json({ error: "Error getting faculty members", details: error.message });
  }
};
