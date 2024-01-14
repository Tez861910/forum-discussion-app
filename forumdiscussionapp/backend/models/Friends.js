import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Friends",
    {
      FriendshipID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID1: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      UserID2: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
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
      tableName: "Friends",
      indexes: [
        {
          name: "idx_user_id1_friends",
          fields: ["UserID1"],
        },
        {
          name: "idx_user_id2_friends",
          fields: ["UserID2"],
        },
        {
          name: "idx_common_attribute_id_friends",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
