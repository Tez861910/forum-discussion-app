import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "FriendRequests",
    {
      RequestID: {
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
      RequestStatus: {
        type: DataTypes.ENUM,
        values: ["Pending", "Accepted", "Rejected"],
        defaultValue: "Pending",
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
      tableName: "FriendRequests",
      indexes: [
        {
          name: "idx_sender_id_friendrequests",
          fields: ["SenderID"],
        },
        {
          name: "idx_receiver_id_friendrequests",
          fields: ["ReceiverID"],
        },
        {
          name: "idx_common_attribute_id_friendrequests",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
