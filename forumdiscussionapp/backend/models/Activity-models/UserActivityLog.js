import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserActivityLog",
    {
      LogID: {
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
      ActivityType: {
        type: DataTypes.ENUM,
        values: [
          "Login",
          "Logout",
          "ThreadCreated",
          "CommentAdded",
          "ReactionAdded",
        ],
        allowNull: false,
      },
      ActivityDetails: {
        type: DataTypes.TEXT,
      },
      IPAddress: {
        type: DataTypes.STRING(50),
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
      tableName: "UserActivityLog",
      indexes: [
        {
          name: "idx_user_id_useractivitylog",
          fields: ["UserID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
