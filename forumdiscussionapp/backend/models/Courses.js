import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
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
      indexes: [
        {
          name: "idx_common_attribute_id_courses",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
