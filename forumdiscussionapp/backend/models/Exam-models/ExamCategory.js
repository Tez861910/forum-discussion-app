import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ExamCategory",
    {
      CategoryID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CategoryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "ExamCategory",
      timestamps: false,
      engine: "InnoDB",
    }
  );
}
