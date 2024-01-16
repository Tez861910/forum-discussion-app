import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserPollVotes",
    {
      UserPollVoteID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      PollOptionID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "PollOptions",
          key: "PollOptionID",
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
      tableName: "UserPollVotes",
      indexes: [
        {
          name: "idx_user_id_userpollvotes",
          fields: ["UserID"],
        },
        {
          name: "idx_poll_option_id_userpollvotes",
          fields: ["PollOptionID"],
        },
        {
          name: "idx_common_attribute_id_userpollvotes",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
