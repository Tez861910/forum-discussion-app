import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Question",
    {
      QuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      QuestionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      QuestionTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "QuestionType",
          key: "QuestionTypeID",
        },
      },
      ExamID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Exam",
          key: "ExamID",
        },
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
        },
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
      tableName: "Question",
      indexes: [
        {
          name: "idx_course_id_questions",
          fields: ["CourseID"],
        },
        {
          name: "idx_exam_id_questions",
          fields: ["ExamID"],
        },
        {
          name: "idx_question_type_id_questions",
          fields: ["QuestionTypeID"],
        },
        {
          name: "idx_common_attribute_id_questions",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
