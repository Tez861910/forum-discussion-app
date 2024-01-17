import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Forums",
    {
      ForumID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ForumName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ForumDescription: {
        type: DataTypes.TEXT,
      },
      CreatedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
        },
      },
    },
    {
      tableName: "Forums",
      timestamps: false,
      indexes: [
        {
          name: "idx_created_by_user_id_forums",
          fields: ["CreatedByUserID"],
        },
        {
          name: "idx_common_attribute_id_forums",
          fields: ["CommonAttributeID"],
        },
        {
          name: "idx_course_id_forums",
          fields: ["CourseID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
