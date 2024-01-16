import { DataTypes } from "sequelize";

export default function (sequelize) {
  const FacultyMembers = sequelize.define(
    "FacultyMembers",
    {
      FacultyID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      FacultyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      DepartmentID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Departments",
          key: "DepartmentID",
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
      tableName: "FacultyMembers",
      indexes: [
        {
          name: "idx_faculty_id_facultymembers",
          fields: ["FacultyID"],
        },
        {
          name: "idx_department_id_facultymembers",
          fields: ["DepartmentID"],
        },
        {
          name: "idx_common_attribute_id_facultymembers",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return FacultyMembers;
}
