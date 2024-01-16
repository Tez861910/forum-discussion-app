import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Departments = sequelize.define(
    "Departments",
    {
      DepartmentID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      DepartmentName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      DepartmentDescription: {
        type: DataTypes.TEXT,
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
      tableName: "Departments",
      indexes: [
        {
          name: "idx_department_id_departments",
          fields: ["DepartmentID"],
        },
        {
          name: "idx_common_attribute_id_departments",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return Departments;
}
