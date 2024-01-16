import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Answer",
    {
      AnswerID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      QuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Question",
          key: "QuestionID",
        },
      },
      AnswerText: {
        type: DataTypes.TEXT,
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
      tableName: "Answer",
      indexes: [
        {
          name: "idx_question_id_answers",
          fields: ["QuestionID"],
        },
        {
          name: "idx_common_attribute_id_answers",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
