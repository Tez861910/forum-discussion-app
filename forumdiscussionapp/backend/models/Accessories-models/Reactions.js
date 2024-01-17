import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Reactions",
    {
      ReactionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ReactionByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ReactionTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "ReactionType",
          key: "ReactionTypeID",
        },
      },
      ReactedToType: {
        type: DataTypes.ENUM,
        values: ["Thread", "Comment", "Response"],
        allowNull: false,
      },
      ReactedToID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      IsPositive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: "Reactions",
      timestamps: false,
      indexes: [
        {
          name: "idx_user_id_reactions",
          fields: ["ReactionByUserID"],
        },
        {
          name: "idx_reaction_type_id_reactions",
          fields: ["ReactionTypeID"],
        },
        {
          name: "idx_reacted_to_id_reactions",
          fields: ["ReactedToID", "ReactedToType"],
        },
        {
          name: "idx_common_attribute_id_reactions",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
