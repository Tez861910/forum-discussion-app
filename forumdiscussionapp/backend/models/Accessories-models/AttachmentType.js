import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "AttachmentType",
    {
      AttachmentTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      AttachmentTypeName: {
        type: DataTypes.ENUM,
        values: ["Image", "Document", "Video"],
        allowNull: false,
      },
    },
    {
      tableName: "AttachmentType",
      timestamps: false,
      indexes: [
        {
          name: "idx_attachment_type_name_attachmenttype",
          fields: ["AttachmentTypeName"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
