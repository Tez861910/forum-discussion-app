import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Events",
    {
      EventID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      EventTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      EventDescription: {
        type: DataTypes.TEXT,
      },
      EventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Location: {
        type: DataTypes.STRING(255),
      },
      UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      CourseID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Courses",
          key: "CourseID",
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
      tableName: "Events",
      timestamps: false,
      indexes: [
        {
          name: "idx_user_id_events",
          fields: ["UserID"],
        },
        {
          name: "idx_course_id_events",
          fields: ["CourseID"],
        },
        {
          name: "idx_common_attribute_id_events",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
