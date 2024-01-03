-- Roles Table
CREATE TABLE  Roles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName VARCHAR(255) NOT NULL,
    RoleDescription TEXT,
    CommonAttributeID INT,
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_common_attribute_id_roles (CommonAttributeID)
);
