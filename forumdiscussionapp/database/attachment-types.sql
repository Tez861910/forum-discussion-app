-- AttachmentType Table
CREATE TABLE AttachmentType (
    AttachmentTypeID INT IDENTITY(1,1) PRIMARY KEY,
    AttachmentTypeName NVARCHAR(20) NOT NULL CHECK (AttachmentTypeName IN ('Image', 'Document', 'Video')),
    INDEX idx_attachment_type_name_attachmenttype (AttachmentTypeName)
);

