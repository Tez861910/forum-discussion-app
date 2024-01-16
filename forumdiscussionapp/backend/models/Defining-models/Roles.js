import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Roles = sequelize.define(
    "Roles",
    {
      RoleID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      RoleName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      RoleDescription: {
        type: DataTypes.TEXT,
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
      tableName: "Roles",
      indexes: [
        {
          name: "idx_common_attribute_id_roles",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return Roles;
}
