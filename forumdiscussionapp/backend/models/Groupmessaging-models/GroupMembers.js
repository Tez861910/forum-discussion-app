import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "GroupMembers",
    {
      GroupID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: "GroupChat",
          key: "GroupID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
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
    },
    {
      tableName: "GroupMembers",
      indexes: [
        {
          name: "idx_group_id_groupmembers",
          fields: ["GroupID"],
        },
        {
          name: "idx_user_id_groupmembers",
          fields: ["UserID"],
        },
        {
          name: "idx_common_attribute_id_groupmembers",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
