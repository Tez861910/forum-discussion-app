import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Polls",
    {
      PollID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      PollQuestion: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      tableName: "Polls",
      indexes: [
        {
          name: "idx_created_by_user_id_polls",
          fields: ["CreatedByUserID"],
        },
        {
          name: "idx_common_attribute_id_polls",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
