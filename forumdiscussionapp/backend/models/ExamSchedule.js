import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ExamSchedule",
    {
      ScheduleID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
      },
      CreatedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
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
      tableName: "ExamSchedule",
      indexes: [
        {
          name: "idx_exam_id_exam_schedule",
          fields: ["ExamID"],
        },
        {
          name: "idx_created_by_user_id_exam_schedule",
          fields: ["CreatedByUserID"],
        },
        {
          name: "idx_common_attribute_id_exam_schedule",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
