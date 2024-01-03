-- RecurringEvents table
CREATE TABLE RecurringEvents (
    RecurringEventID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT,
    RecurrenceType VARCHAR(20) NOT NULL,
    RecurrenceInterval INT,
    CommonAttributeID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    INDEX idx_event_id_recurringevents (EventID),
    INDEX idx_common_attribute_id_recurringevents (CommonAttributeID)
);
