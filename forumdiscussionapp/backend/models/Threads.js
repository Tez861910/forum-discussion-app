import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Threads",
    {
      ThreadID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ThreadTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ThreadContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Views: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
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
    },
    {
      tableName: "Threads",
      indexes: [
        {
          name: "idx_user_id_threads",
          fields: ["UserID"],
        },
        {
          name: "idx_forum_id_threads",
          fields: ["ForumID"],
        },
        {
          name: "idx_common_attribute_id_threads",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
