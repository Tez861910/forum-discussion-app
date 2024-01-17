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
      CommonAttributeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "CommonAttributes",
          key: "AttributeID",
        },
      },
    },
    {
      tableName: "Gender",
      timestamps: false,
      indexes: [
        {
          name: "idx_common_attribute_id_gender",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );

  return Genders;
}
