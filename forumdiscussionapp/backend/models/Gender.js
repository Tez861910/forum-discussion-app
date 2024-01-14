import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Gender",
    {
      GenderID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      GenderName: {
        type: DataTypes.ENUM,
        values: ["Male", "Female", "Other"],
        defaultValue: "Other",
      },
    },
    {
      tableName: "Gender",
      engine: "InnoDB",
    }
  );
}
