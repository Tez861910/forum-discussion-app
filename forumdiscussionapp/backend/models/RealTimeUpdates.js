import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "RealTimeUpdates",
    {
      RTUpdateID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        values: ["Message", "TypingIndicator"],
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
      tableName: "RealTimeUpdates",
      indexes: [
        {
          name: "idx_user_id_realtimeupdates",
          fields: ["UserID"],
        },
        {
          name: "idx_timestamp_realtimeupdates",
          fields: ["Timestamp"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
