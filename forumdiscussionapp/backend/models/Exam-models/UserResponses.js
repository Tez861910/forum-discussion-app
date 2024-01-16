import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserResponses",
    {
      UserResponseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      QuestionID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      AnswerID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "MCQOptions",
          key: "MCQOptionID",
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
      tableName: "UserResponses",
      indexes: [
        {
          name: "idx_user_id_userresponses",
          fields: ["UserID"],
        },
        {
          name: "idx_question_id_userresponses",
          fields: ["QuestionID"],
        },
        {
          name: "idx_answer_id_userresponses",
          fields: ["AnswerID"],
        },
        {
          name: "idx_common_attribute_id_userresponses",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
