import { DataTypes } from "sequelize";

export default function (sequelize) {
  const CommonAttributes = sequelize.define(
    "CommonAttributes",
    {
      AttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      CreatedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
      UpdatedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      DeletedAt: {
        type: DataTypes.DATE,
      },
      DeletedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "CommonAttributes",
      indexes: [
        {
          name: "idx_created_at_commonattributes",
          fields: ["CreatedAt"],
        },
        {
          name: "idx_updated_at_commonattributes",
          fields: ["UpdatedAt"],
        },
      ],
      engine: "InnoDB",
      timestamps: false,
    }
  );

  return CommonAttributes;
}
