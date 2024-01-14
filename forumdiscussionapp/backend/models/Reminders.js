import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Reminders",
    {
      ReminderID: {
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
      ReminderTime: {
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
      tableName: "Reminders",
      indexes: [
        {
          name: "idx_event_id_reminders",
          fields: ["EventID"],
        },
        {
          name: "idx_common_attribute_id_reminders",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
