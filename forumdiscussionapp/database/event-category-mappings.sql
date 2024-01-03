-- EventCategoryMapping table to associate events with categories
CREATE TABLE EventCategoryMapping (
    EventID INT,
    CategoryID INT,
    CommonAttributeID INT,
    PRIMARY KEY (EventID, CategoryID),
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (CategoryID) REFERENCES EventCategories(CategoryID),
    INDEX idx_event_id_eventcategorymapping (EventID),
    INDEX idx_category_id_eventcategorymapping (CategoryID),
    INDEX idx_common_attribute_id_eventcategorymapping (CommonAttributeID)
);
