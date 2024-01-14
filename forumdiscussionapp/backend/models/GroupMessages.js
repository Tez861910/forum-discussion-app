import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "GroupMessages",
    {
      GroupMessageID: {
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
      SenderID: {
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
      tableName: "GroupMessages",
      indexes: [
        {
          name: "idx_group_id_groupmessages",
          fields: ["GroupID"],
        },
        {
          name: "idx_sender_id_groupmessages",
          fields: ["SenderID"],
        },
        {
          name: "idx_common_attribute_id_groupmessages",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
