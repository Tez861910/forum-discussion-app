import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ForumsReplies",
    {
      ForumReplyID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ForumPostID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "ForumsPosts",
          key: "ForumPostID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ReplyContent: {
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
      tableName: "ForumsReplies",
      indexes: [
        {
          name: "idx_user_id_forumsreplies",
          fields: ["UserID"],
        },
        {
          name: "idx_forumpost_id_forumsreplies",
          fields: ["ForumPostID"],
        },
        {
          name: "idx_common_attribute_id_forumsreplies",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
