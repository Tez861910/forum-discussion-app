import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "EventImages",
    {
      ImageID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      EventID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Events",
          key: "EventID",
        },
      },
      ImageURL: {
        type: DataTypes.STRING(255),
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
      tableName: "EventImages",
      timestamps: false,
      indexes: [
        {
          name: "idx_event_id_eventimages",
          fields: ["EventID"],
        },
        {
          name: "idx_common_attribute_id_eventimages",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
