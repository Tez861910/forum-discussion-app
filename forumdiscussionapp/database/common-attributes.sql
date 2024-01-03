-- CommonAttributes Table
CREATE TABLE  CommonAttributes (
    AttributeID INT IDENTITY(1,1) PRIMARY KEY,
    CreatedAt DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    CreatedByUserID INT,
    UpdatedAt DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    UpdatedByUserID INT,
    DeletedAt DATETIME2,
    DeletedByUserID INT,
    IsDeleted BIT DEFAULT 0,
    INDEX idx_created_at_commonattributes CLUSTERED (CreatedAt),
    INDEX idx_updated_at_commonattributes NONCLUSTERED (UpdatedAt)
);
