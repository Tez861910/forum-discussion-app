import { DataTypes } from "sequelize";

export default function (sequelize) {
  const UserCourses = sequelize.define(
    "UserCourses",
    {
      UserCourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
        },
      },
      EnrollmentDate: {
        type: DataTypes.DATE,
      },
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
    },
    {
      tableName: "UserCourses",
      timestamps: false,
      indexes: [
        {
          name: "idx_user_id_usercourses",
          fields: ["UserID"],
        },
        {
          name: "idx_course_id_usercourses",
          fields: ["CourseID"],
        },
        {
          name: "idx_common_attribute_id_usercourses",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return UserCourses;
}
