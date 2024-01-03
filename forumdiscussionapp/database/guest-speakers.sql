-- GuestSpeakers table
CREATE TABLE GuestSpeakers (
    SpeakerID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT,
    SpeakerName VARCHAR(100) NOT NULL,
    ContributionDescription TEXT,
    CommonAttributeID INT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    INDEX idx_event_id_guestspeakers (EventID),
    INDEX idx_common_attribute_id_guestspeakers (CommonAttributeID)
);
