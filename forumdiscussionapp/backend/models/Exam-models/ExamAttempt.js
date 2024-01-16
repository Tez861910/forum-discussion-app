import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ExamAttempt",
    {
      AttemptID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ExamID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Exam",
          key: "ExamID",
        },
      },
      StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      EndTime: {
        type: DataTypes.DATE,
      },
      Status: {
        type: DataTypes.STRING(50),
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
      tableName: "ExamAttempt",
      indexes: [
        {
          name: "idx_user_id_exam_attempt",
          fields: ["UserID"],
        },
        {
          name: "idx_exam_id_exam_attempt",
          fields: ["ExamID"],
        },
        {
          name: "idx_common_attribute_id_exam_attempt",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
