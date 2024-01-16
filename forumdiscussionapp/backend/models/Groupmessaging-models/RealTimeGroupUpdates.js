import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "RealTimeGroupUpdates",
    {
      RTGUpdateID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      GroupID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "GroupChat",
          key: "GroupID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      UpdateType: {
        type: DataTypes.ENUM,
        values: ["GroupMessage", "TypingIndicator"],
        allowNull: false,
      },
      Data: {
        type: DataTypes.TEXT,
      },
      Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "RealTimeGroupUpdates",
      indexes: [
        {
          name: "idx_group_id_realtimegroupupdates",
          fields: ["GroupID"],
        },
        {
          name: "idx_user_id_realtimegroupupdates",
          fields: ["UserID"],
        },
        {
          name: "idx_timestamp_realtimegroupupdates",
          fields: ["Timestamp"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
