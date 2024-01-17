import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ForumsModerators",
    {
      ForumModeratorID: {
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
      ForumID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Forums",
          key: "ForumID",
        },
      },
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
      PromotedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "ForumsModerators",
      timestamps: false,
      indexes: [
        {
          name: "idx_user_id_forummoderators",
          fields: ["UserID"],
        },
        {
          name: "idx_forum_id_forummoderators",
          fields: ["ForumID"],
        },
        {
          name: "idx_common_attribute_id_forummoderators",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
