import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "PrivateMessages",
    {
      MessageID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      SenderID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ReceiverID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      MessageContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      IsRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      IsArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      IsPersisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
      Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "PrivateMessages",
      timestamps: false,
      indexes: [
        {
          name: "idx_sender_id_privatemessages",
          fields: ["SenderID"],
        },
        {
          name: "idx_receiver_id_privatemessages",
          fields: ["ReceiverID"],
        },
        {
          name: "idx_common_attribute_id_privatemessages",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
