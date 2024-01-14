import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserRoles",
    {
      UserRolesID: {
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
      RoleID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Roles",
          key: "RoleID",
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
      tableName: "UserRoles",
      indexes: [
        {
          name: "idx_user_id_userroles",
          fields: ["UserID"],
        },
        {
          name: "idx_role_id_userroles",
          fields: ["RoleID"],
        },
        {
          name: "idx_common_attribute_id_userroles",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
