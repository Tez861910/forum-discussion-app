import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "EventCategories",
    {
      CategoryID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      CategoryName: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
      tableName: "EventCategories",
      timestamps: false,
      indexes: [
        {
          name: "idx_common_attribute_id_eventcategories",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
