-- UserRoles Table
CREATE TABLE UserRoles (
    UserRolesID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    RoleID INT,
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_userroles (UserID),
    INDEX idx_role_id_userroles (RoleID),
    INDEX idx_common_attribute_id_userroles (CommonAttributeID)
);
