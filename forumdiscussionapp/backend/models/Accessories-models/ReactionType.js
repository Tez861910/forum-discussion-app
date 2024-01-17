import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ReactionType",
    {
      ReactionTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ReactionTypeName: {
        type: DataTypes.ENUM,
        values: ["Like", "Dislike", "Love", "Angry"],
        allowNull: false,
      },
    },
    {
      tableName: "ReactionType",
      timestamps: false,
      indexes: [
        {
          name: "idx_reaction_type_name_reactiontype",
          fields: ["ReactionTypeName"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
