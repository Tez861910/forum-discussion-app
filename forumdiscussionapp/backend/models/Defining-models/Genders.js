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
        type: DataTypes.STRING(10),
        defaultValue: "Other",
      },
    },
    {
      tableName: "Genders",
      timestamps: false,
      engine: "InnoDB",
    }
  );

  return Genders;
}
