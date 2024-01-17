import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Courses = sequelize.define(
    "Courses",
    {
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CourseName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      CourseDescription: {
        type: DataTypes.TEXT,
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
      tableName: "Courses",
      timestamps: false,
      indexes: [
        {
          name: "idx_common_attribute_id_courses",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return Courses;
}