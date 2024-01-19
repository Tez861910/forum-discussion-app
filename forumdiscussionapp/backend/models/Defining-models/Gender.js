import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Genders = sequelize.define(
    "Genders",
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
      timestamps: false,
      engine: "InnoDB",
    }
  );

  return Genders;
}
