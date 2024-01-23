import { sequelize } from "../../../db.js";

export const getAllEvents = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, error: "CourseID is undefined" });
    }

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Events = sequelize.models.Events;

    // Selecting relevant fields from the Events table
    const events = await Events.findAll({
      attributes: [
        "EventID",
        "EventTitle",
        "EventDescription",
        "EventDate",
        "Location",
      ],
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
      where: { CourseID: courseId },
    });

    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, error: "Error fetching events" });
  }
};
