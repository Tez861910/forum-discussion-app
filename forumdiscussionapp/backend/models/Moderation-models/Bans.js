import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Bans",
    {
      BanID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      BannedUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      BannedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      BanReason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      BanExpiresAt: {
        type: DataTypes.DATE,
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
      tableName: "Bans",
      timestamps: false,
      indexes: [
        {
          name: "idx_banned_user_id_ban",
          fields: ["BannedUserID"],
        },
        {
          name: "idx_banned_by_user_id_ban",
          fields: ["BannedByUserID"],
        },
        {
          name: "idx_common_attribute_id_ban",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
