import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "QuestionType",
    {
      QuestionTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      QuestionTypeName: {
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
      tableName: "QuestionType",
      timestamps: false,
      indexes: [
        {
          name: "idx_common_attribute_id_questiontype",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
