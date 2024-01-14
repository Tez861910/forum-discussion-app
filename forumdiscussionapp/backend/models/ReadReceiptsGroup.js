import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "ReadReceiptsGroup",
    {
      GReceiptID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      GroupMessageID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "GroupMessages",
          key: "GroupMessageID",
        },
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "ReadReceiptsGroup",
      indexes: [
        {
          name: "idx_group_message_id_readreceiptsgroup",
          fields: ["GroupMessageID"],
        },
        {
          name: "idx_user_id_readreceiptsgroup",
          fields: ["UserID"],
        },
        {
          name: "idx_timestamp_readreceiptsgroup",
          fields: ["Timestamp"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
