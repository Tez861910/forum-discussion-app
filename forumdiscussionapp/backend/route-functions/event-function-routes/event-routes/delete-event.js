import { query } from "../../../db.js";

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const UserID = req.user.userId;

    // Check if the event is already deleted
    const isEventDeleted = await query(
      "SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM Events WHERE EventID = ?)",
      [eventId]
    );

    if (isEventDeleted[0].IsDeleted) {
      // If the event is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: "Event already deleted" });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await query(
      "UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM Events WHERE EventID = ?)",
      [UserID, eventId]
    );

    res.json({ success: true, message: "Event soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting event:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting event" });
  }
};
