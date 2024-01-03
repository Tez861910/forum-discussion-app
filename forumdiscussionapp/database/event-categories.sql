-- EventCategories table
CREATE TABLE EventCategories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL,
    CommonAttributeID INT,
    INDEX idx_common_attribute_id_eventcategories (CommonAttributeID)
);
