import { query } from "../../../db.js";

export const handleCoursesEnrollmentsId = async (req, res) => {
  const courseId = req.params.courseId;
  console.log("Received courseId:", courseId);

  try {
    if (!query) {
      throw new Error(
        "Database connection not established or query function not defined."
      );
    }

    const sql = `
      SELECT
        users.UserID,
        users.UserName
      FROM
        users
      JOIN
        usercourses ON users.UserID = usercourses.UserID
      JOIN
        courses ON usercourses.CourseID = courses.CourseID
      JOIN
        commonattributes AS ca_courses ON courses.CommonAttributeID = ca_courses.AttributeID
      JOIN
        commonattributes AS ca_usercourses ON usercourses.CommonAttributeID = ca_usercourses.AttributeID
      JOIN
        commonattributes AS ca_users ON users.CommonAttributeID = ca_users.AttributeID
      WHERE
        courses.CourseID = ? AND ca_courses.IsDeleted = FALSE 
        AND ca_usercourses.IsDeleted = FALSE AND ca_users.IsDeleted = FALSE;
    `;
    console.log("SQL Query:", sql);

    const rows = await query(sql, [parseInt(courseId, 10)]);

    console.log("Query Result:", rows);

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No enrollments found for the course" });
    }

    const enrollmentsResult = {};
    rows.forEach((row) => {
      const { UserID, UserName } = row;
      if (!enrollmentsResult[UserID]) {
        enrollmentsResult[UserID] = [];
      }
      enrollmentsResult[UserID].push({ UserID, UserName });
    });

    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
