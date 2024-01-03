-- Users Table
CREATE TABLE  Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    UserEmail VARCHAR(255) NOT NULL UNIQUE,
    UserPassword VARCHAR(255) NOT NULL, 
    Address VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    DateOfBirth DATE,  
    GenderID INT,
    AvatarPath VARCHAR(255) NOT NULL DEFAULT '',
    CommonAttributeID INT,
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_users (UserID),
    INDEX idx_user_email_users (UserEmail)
);
