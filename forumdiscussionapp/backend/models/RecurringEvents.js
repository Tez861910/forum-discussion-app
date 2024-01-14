import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "RecurringEvents",
    {
      RecurringEventID: {
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
      RecurrenceType: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      RecurrenceInterval: {
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
      tableName: "RecurringEvents",
      indexes: [
        {
          name: "idx_event_id_recurringevents",
          fields: ["EventID"],
        },
        {
          name: "idx_common_attribute_id_recurringevents",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
