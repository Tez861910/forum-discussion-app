import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserSettings",
    {
      SettingID: {
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
      Theme: {
        type: DataTypes.STRING(50),
      },
      DarkMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      Language: {
        type: DataTypes.STRING(50),
      },
      EmailNotifications: {
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
    },
    {
      tableName: "UserSettings",
      indexes: [
        {
          name: "idx_user_id_user_settings",
          fields: ["UserID"],
        },
        {
          name: "idx_common_attribute_id_user_settings",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
