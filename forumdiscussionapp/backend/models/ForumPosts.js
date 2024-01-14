import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ForumsPosts",
    {
      ForumPostID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ForumID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Forums",
          key: "ForumID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      PostContent: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName: "ForumsPosts",
      indexes: [
        {
          name: "idx_user_id_forumsposts",
          fields: ["UserID"],
        },
        {
          name: "idx_forum_id_forumsposts",
          fields: ["ForumID"],
        },
        {
          name: "idx_common_attribute_id_forumsposts",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
