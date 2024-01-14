import { Courses, CommonAttributes } from "../../../db.js";

export const handleCoursesGet = async (req, res) => {
  try {
    const courses = await Courses.findAll({
      include: [
        {
          model: CommonAttributes,
          as: "commonAttributes",
          where: { IsDeleted: false },
        },
      ],
    });

    if (!Array.isArray(courses) || courses.length === 0) {
      console.error("No courses found in the database");
      return res.status(404).json({ error: "No courses found" });
    }

    console.log("Courses fetched successfully");
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error getting courses:", error);
    res
      .status(500)
      .json({ error: "Error getting courses", details: error.message });
  }
};
