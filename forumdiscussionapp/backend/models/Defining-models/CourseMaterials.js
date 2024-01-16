import { DataTypes } from "sequelize";

export default function (sequelize) {
  const CourseMaterials = sequelize.define(
    "CourseMaterials",
    {
      MaterialID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
        },
      },
      MaterialName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      MaterialType: {
        type: DataTypes.ENUM,
        values: ["LectureNotes", "Slides", "AdditionalResources"],
        allowNull: false,
      },
      FilePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      UploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      Description: {
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
      tableName: "CourseMaterials",
      indexes: [
        {
          name: "idx_course_id_coursematerials",
          fields: ["CourseID"],
        },
        {
          name: "idx_common_attribute_id_coursematerials",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return CourseMaterials;
}
