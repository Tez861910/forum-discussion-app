import { sequelize } from "../../../db.js";

export const handleCoursesGet = async (req, res) => {
  try {
    // Dynamically access the models using sequelize.models
    const Courses = sequelize.models.Courses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find all courses with associated CommonAttributes
    const courses = await Courses.findAll({
      include: [
        {
          model: CommonAttributes,
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
    res.status(500).json({
      error: "Error getting courses",
      details: error.message,
    });
  }
};
