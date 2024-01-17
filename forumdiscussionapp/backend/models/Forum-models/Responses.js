import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Responses",
    {
      ResponseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ResponseContent: {
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
      CommentID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Comments",
          key: "CommentID",
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
      tableName: "Responses",
      timestamps: false,
      indexes: [
        {
          name: "idx_user_id_responses",
          fields: ["UserID"],
        },
        {
          name: "idx_comment_id_responses",
          fields: ["CommentID"],
        },
        {
          name: "idx_common_attribute_id_responses",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
