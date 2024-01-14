import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Results",
    {
      ResultID: {
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
      TotalScore: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      Percentage: {
        type: DataTypes.DECIMAL(5, 2),
      },
      AdditionalMetrics: {
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
      tableName: "Results",
      indexes: [
        {
          name: "idx_user_id_results",
          fields: ["UserID"],
        },
        {
          name: "idx_exam_id_results",
          fields: ["ExamID"],
        },
        {
          name: "idx_common_attribute_id_results",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
