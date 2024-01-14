import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Comments",
    {
      CommentID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CommentContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ThreadID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Threads",
          key: "ThreadID",
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
      tableName: "Comments",
      indexes: [
        {
          name: "idx_user_id_comments",
          fields: ["UserID"],
        },
        {
          name: "idx_thread_id_comments",
          fields: ["ThreadID"],
        },
        {
          name: "idx_common_attribute_id_comments",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
