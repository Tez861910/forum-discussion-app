import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const getGuestSpeakers = async (req, res) => {
  try {
    const { eventId } = req.params;

    const GuestSpeakers = sequelize.models.GuestSpeakers;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Selecting relevant fields from both GuestSpeakers and CommonAttributes tables
    const guestSpeakers = await GuestSpeakers.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
      where: { EventID: eventId },
    });

    res.json({ success: true, guestSpeakers });
  } catch (error) {
    console.error("Error fetching guest speakers:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching guest speakers" });
  }
};
