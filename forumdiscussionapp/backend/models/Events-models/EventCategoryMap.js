import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "EventCategoryMapping",
    {
      EventID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: "Events",
          key: "EventID",
        },
      },
      CategoryID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: "EventCategories",
          key: "CategoryID",
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
      tableName: "EventCategoryMapping",
      timestamps: false,
      indexes: [
        {
          name: "idx_event_id_eventcategorymapping",
          fields: ["EventID"],
        },
        {
          name: "idx_category_id_eventcategorymapping",
          fields: ["CategoryID"],
        },
        {
          name: "idx_common_attribute_id_eventcategorymapping",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
