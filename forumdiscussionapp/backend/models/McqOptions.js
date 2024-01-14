import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "MCQOptions",
    {
      MCQOptionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      MCQQuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "Question",
          key: "QuestionID",
        },
      },
      MCQOptionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      IsCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "MCQOptions",
      indexes: [
        {
          name: "idx_mcq_question_id_mcqoptions",
          fields: ["MCQQuestionID"],
        },
        {
          name: "idx_common_attribute_id_mcqoptions",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
