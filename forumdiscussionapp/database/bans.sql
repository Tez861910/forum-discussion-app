-- Bans Table
CREATE TABLE Bans (
    BanID INT IDENTITY(1,1) PRIMARY KEY,
    BannedUserID INT,
    BannedByUserID INT,
    BanReason TEXT NOT NULL,
    BanExpiresAt DATETIME,
    CommonAttributeID INT,
    INDEX idx_banned_user_id_ban (BannedUserID),
    INDEX idx_banned_by_user_id_ban (BannedByUserID),
    INDEX idx_common_attribute_id_ban (CommonAttributeID)
);
