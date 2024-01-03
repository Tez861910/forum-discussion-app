-- UserReports Table
CREATE TABLE UserReports (
    ReportID INT IDENTITY(1,1) PRIMARY KEY,
    ReporterID INT,
    ReportedUserID INT,
    ReportContent TEXT NOT NULL,
    IsResolved BIT DEFAULT 0,
    CommonAttributeID INT,
    INDEX idx_reporter_id_userreports (ReporterID),
    INDEX idx_reported_user_id_userreports (ReportedUserID),
    INDEX idx_common_attribute_id_userreports (CommonAttributeID)
);
