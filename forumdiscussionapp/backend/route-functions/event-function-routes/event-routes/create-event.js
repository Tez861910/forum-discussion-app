import { sequelize } from "../../../db.js";

export const createEvent = async (req, res) => {
  try {
    // Destructure relevant information from the request body
    const { EventTitle, EventDescription, EventDate, Location } = req.body;

    // Extract user information from the request (assuming it comes from authentication middleware)
    const UserID = req.user.userId;
    const CourseID = req.user.courseId;

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Events = sequelize.models.Events;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: UserID,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.get("AttributeID");

    // Check if CourseID is provided (if the event is associated with a course)
    let eventsResult;
    if (CourseID) {
      // Insert into Events table using CommonAttributeID
      eventsResult = await Events.create({
        EventTitle,
        EventDescription,
        EventDate,
        Location,
        UserID,
        CourseID,
        CommonAttributeID: commonAttributeID,
      });
    } else {
      // If no CourseID provided, insert the event without linking it to a course
      // Insert into Events table using CommonAttributeID
      eventsResult = await Events.create({
        EventTitle,
        EventDescription,
        EventDate,
        Location,
        UserID,
        CommonAttributeID: commonAttributeID,
      });
    }

    // Assuming you want to send a response back to the client
    res.status(201).json({
      message: "Event created successfully",
      eventId: eventsResult.get("EventID"),
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error creating event:", error);

    // Send an appropriate response to the client
    res.status(500).json({ error: "Internal server error" });
  }
};
