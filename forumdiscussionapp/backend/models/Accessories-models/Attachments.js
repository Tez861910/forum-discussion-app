import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "Attachments",
    {
      AttachmentID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      FilePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      AttachedByUserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
      AttachmentTypeID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "AttachmentType",
          key: "AttachmentTypeID",
        },
      },
      AttachedToType: {
        type: DataTypes.ENUM,
        values: ["Thread", "Comment", "Response"],
        allowNull: false,
      },
      AttachedToID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
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
      tableName: "Attachments",
      indexes: [
        {
          name: "idx_attached_by_user_id_attachments",
          fields: ["AttachedByUserID"],
        },
        {
          name: "idx_attachment_type_id_attachments",
          fields: ["AttachmentTypeID"],
        },
        {
          name: "idx_attached_to_id_attachments",
          fields: ["AttachedToID", "AttachedToType"],
        },
        {
          name: "idx_common_attribute_id_attachments",
          fields: ["CommonAttributeID"],
        },
      ],
      engine: "InnoDB",
    }
  );
}
