import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Notifications",
    {
      NotificationID: {
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
      NotificationContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ActionType: {
        type: DataTypes.STRING(50),
      },
      ActionLink: {
        type: DataTypes.STRING(255),
      },
      IsRead: {
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
      tableName: "Notifications",
      indexes: [
        {
          name: "idx_user_id_notifications",
          fields: ["UserID"],
        },
        {
          name: "idx_common_attribute_id_notifications",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
