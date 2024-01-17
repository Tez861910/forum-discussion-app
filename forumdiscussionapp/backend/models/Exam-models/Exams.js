import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Exam",
    {
      ExamID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ExamName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ExamStatus: {
        type: DataTypes.STRING(50),
      },
      ExamDuration: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      Instructions: {
        type: DataTypes.TEXT,
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
        },
      },
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
      CategoryID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "ExamCategory",
          key: "CategoryID",
        },
      },
      CreatedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
    },
    {
      tableName: "Exam",
      timestamps: false,
      indexes: [
        {
          name: "idx_created_by_user_id_exam",
          fields: ["CreatedByUserID"],
        },
        {
          name: "idx_common_attribute_id_exam",
          fields: ["CommonAttributeID"],
        },
        {
          name: "idx_category_id_exam",
          fields: ["CategoryID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
