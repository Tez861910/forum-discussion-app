import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "GroupManager",
    {
      ManagerID: {
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
      ManagerUserID: {
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
    },
    {
      tableName: "GroupManager",
      timestamps: false,
      indexes: [
        {
          name: "idx_group_id_groupmanager",
          fields: ["GroupID"],
        },
        {
          name: "idx_manager_user_id_groupmanager",
          fields: ["ManagerUserID"],
        },
        {
          name: "idx_common_attribute_id_groupmanager",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
