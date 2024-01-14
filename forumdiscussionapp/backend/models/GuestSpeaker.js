import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "GuestSpeakers",
    {
      SpeakerID: {
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
      SpeakerName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ContributionDescription: {
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
      tableName: "GuestSpeakers",
      indexes: [
        {
          name: "idx_event_id_guestspeakers",
          fields: ["EventID"],
        },
        {
          name: "idx_common_attribute_id_guestspeakers",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
