-- Reminders table
CREATE TABLE Reminders (
    ReminderID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT,
    ReminderTime INT,
    CommonAttributeID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    INDEX idx_event_id_reminders (EventID),
    INDEX idx_common_attribute_id_reminders (CommonAttributeID)
);
