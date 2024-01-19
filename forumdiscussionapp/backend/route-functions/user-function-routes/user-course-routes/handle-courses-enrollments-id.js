import { sequelize } from "../../../db.js";

export const handleCoursesEnrollmentsId = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const UserCourses = sequelize.models.UserCourses;
    const Users = sequelize.models.Users;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch user IDs and associated CommonAttributeIDs for a given course ID
    const userCourseData = await UserCourses.findAll({
      where: {
        CourseID: courseId,
      },
      attributes: ["UserID", "CommonAttributeID"],
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    // Extract UserIDs and CommonAttributeIDs from the fetched data
    const userIds = userCourseData.map((userCourse) => userCourse.UserID);
    const commonAttributeIds = userCourseData.map(
      (userCourse) => userCourse.CommonAttributeID
    );

    // Fetch usernames and associated CommonAttributes for the obtained user IDs
    const enrollmentsResult = await Promise.all(
      userIds.map(async (userID, index) => {
        try {
          // Fetch the user including CommonAttributeID from the Users table
          const user = await Users.findOne({
            where: {
              UserID: userID,
            },
            attributes: ["UserID", "UserName", "CommonAttributeID"],
          });

          if (!user) {
            throw new Error("User not found");
          }

          const userCommonAttributeId = user.CommonAttributeID;

          if (!userCommonAttributeId) {
            throw new Error("CommonAttributeID is null");
          }

          // Check for IsDeleted status in the associated CommonAttributes table
          const userCommonAttributes = await CommonAttributes.findOne({
            where: {
              AttributeID: userCommonAttributeId,
              IsDeleted: false,
            },
          });

          return {
            UserID: user.UserID,
            UserName: user.UserName,
            UserCommonAttributes: userCommonAttributes
              ? {
                  AttributeID: userCommonAttributes.AttributeID,
                }
              : null,
          };
        } catch (error) {
          console.error(`Error processing user ${userID}:`, error.message);
          return null;
        }
      })
    );

    // Filter out null entries (users not found or with null CommonAttributeID)
    const filteredEnrollments = enrollmentsResult.filter(
      (enrollment) => enrollment !== null
    );

    console.log("Usernames fetched successfully");
    console.log("Enrollments Result:", filteredEnrollments);

    res.json({ enrollments: filteredEnrollments });
  } catch (error) {
    console.error("Error fetching usernames by course ID:", error);
    res.status(500).json({
      error: "Usernames retrieval by course ID failed",
      details: error.message,
    });
  }
};
