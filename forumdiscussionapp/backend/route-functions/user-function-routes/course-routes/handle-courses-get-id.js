import { sequelize } from "../../../db.js";

export const handleCoursesGetId = async (req, res) => {
  const { id } = req.params;

  try {
    // Dynamically access the Courses model using sequelize.models
    const Courses = sequelize.models.Courses;

    // Dynamically access the CommonAttributes model using sequelize.models
    const CommonAttributes = sequelize.models.CommonAttributes;

    const course = await Courses.findOne({
      where: { CourseID: id },
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
    res
      .status(500)
      .json({ error: "Course retrieval failed", details: error.message });
  }
};
