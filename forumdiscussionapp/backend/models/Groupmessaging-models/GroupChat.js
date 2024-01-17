import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "GroupChat",
    {
      GroupID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      GroupName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      Description: {
        type: DataTypes.TEXT,
      },
      CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      CreatorUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      IsPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      MaxMembers: {
        type: DataTypes.INTEGER,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      Category: {
        type: DataTypes.STRING(100),
      },
      CoverPhotoURL: {
        type: DataTypes.STRING(255),
      },
      WelcomeMessage: {
        type: DataTypes.TEXT,
      },
      ModeratorUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      tableName: "GroupChat",
      timestamps: false,
      indexes: [
        {
          name: "idx_creator_user_id_groupchat",
          fields: ["CreatorUserID"],
        },
        {
          name: "idx_moderator_user_id_groupchat",
          fields: ["ModeratorUserID"],
        },
        {
          name: "idx_common_attribute_id_groupchat",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
