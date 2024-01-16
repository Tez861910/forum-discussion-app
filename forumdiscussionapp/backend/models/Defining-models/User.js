import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Users = sequelize.define(
    "Users",
    {
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      UserEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      UserPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      PhoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      DateOfBirth: {
        type: DataTypes.DATE,
      },
      GenderID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      AvatarPath: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
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
      tableName: "Users",
      indexes: [
        {
          name: "idx_user_id_users",
          fields: ["UserID"],
        },
        {
          name: "idx_user_email_users",
          fields: ["UserEmail"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return Users;
}
