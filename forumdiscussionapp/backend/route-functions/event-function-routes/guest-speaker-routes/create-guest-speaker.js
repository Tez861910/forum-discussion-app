import { query } from "../../../db.js";

export const createGuestSpeaker = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { SpeakerName, ContributionDescription } = req.body;

    await query(
      "INSERT INTO GuestSpeakers (EventID, SpeakerName, ContributionDescription) VALUES (?, ?, ?)",
      [eventId, SpeakerName, ContributionDescription]
    );

    res
      .status(201)
      .json({ success: true, message: "Guest speaker created successfully" });
  } catch (error) {
    console.error("Error creating guest speaker:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
