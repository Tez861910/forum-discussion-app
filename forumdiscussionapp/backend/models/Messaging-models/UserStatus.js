import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserStatus",
    {
      StatusID: {
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
      LastOnline: {
        type: DataTypes.DATE,
      },
      IsOnline: {
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
    },
    {
      tableName: "UserStatus",
      indexes: [
        {
          name: "idx_user_id_userstatus",
          fields: ["UserID"],
        },
        {
          name: "idx_common_attribute_id_userstatus",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
