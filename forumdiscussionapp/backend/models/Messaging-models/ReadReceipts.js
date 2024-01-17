import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ReadReceipts",
    {
      ReceiptID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      MessageID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "PrivateMessages",
          key: "MessageID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "ReadReceipts",
      timestamps: false,
      indexes: [
        {
          name: "idx_message_id_readreceipts",
          fields: ["MessageID"],
        },
        {
          name: "idx_user_id_readreceipts",
          fields: ["UserID"],
        },
        {
          name: "idx_timestamp_readreceipts",
          fields: ["Timestamp"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
