import { sequelize } from "../../../db.js";

export const handleCoursesGetId = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const Courses = sequelize.models.Courses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the course with associated CommonAttributes
    const course = await Courses.findOne({
      where: { CourseID: courseId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    if (course) {
      console.log("Course fetched successfully");
      res.json({ course });
    } else {
      console.error("Course not found");
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      error: "Course retrieval failed",
      details: error.message,
    });
  }
};
