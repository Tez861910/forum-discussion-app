-- Attachments Table
CREATE TABLE Attachments (
    AttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    FilePath NVARCHAR(255) NOT NULL,
    AttachedByUserID INT,
    AttachmentTypeID INT,
    AttachedToType NVARCHAR(20) NOT NULL CHECK (AttachedToType IN ('Thread', 'Comment', 'Response')),
    AttachedToID INT NOT NULL,
    Description TEXT,
    CommonAttributeID INT,
    INDEX idx_attached_by_user_id_attachments (AttachedByUserID),
    INDEX idx_attachment_type_id_attachments (AttachmentTypeID),
    INDEX idx_attached_to_id_attachments (AttachedToID, AttachedToType),
    INDEX idx_common_attribute_id_attachments (CommonAttributeID)
);
