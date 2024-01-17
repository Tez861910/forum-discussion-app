import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "UserReports",
    {
      ReportID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ReporterID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ReportedUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      ReportContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      IsResolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "UserReports",
      timestamps: false,
      indexes: [
        {
          name: "idx_reporter_id_userreports",
          fields: ["ReporterID"],
        },
        {
          name: "idx_reported_user_id_userreports",
          fields: ["ReportedUserID"],
        },
        {
          name: "idx_common_attribute_id_userreports",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
