import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "PollOptions",
    {
      PollOptionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      PollID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Polls",
          key: "PollID",
        },
      },
      OptionText: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName: "PollOptions",
      timestamps: false,
      indexes: [
        {
          name: "idx_poll_id_polloptions",
          fields: ["PollID"],
        },
        {
          name: "idx_common_attribute_id_polloptions",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
