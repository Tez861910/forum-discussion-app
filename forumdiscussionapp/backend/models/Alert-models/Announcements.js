import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Announcements",
    {
      AnnouncementID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      AnnouncementTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      AnnouncementContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ExpiryDate: {
        type: DataTypes.DATE,
      },
      CreatedByUserID: {
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
      tableName: "Announcements",
      timestamps: false,
      indexes: [
        {
          name: "idx_created_by_user_id_announcements",
          fields: ["CreatedByUserID"],
        },
        {
          name: "idx_common_attribute_id_announcements",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
