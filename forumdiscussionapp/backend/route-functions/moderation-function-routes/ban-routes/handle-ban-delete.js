import { Bans } from "../../../db.js";

export const handleBanDelete = async (req, res) => {
  const { banId } = req.params;

  try {
    // Delete the ban
    const result = await Bans.destroy({
      where: { BanID: banId },
    });

    if (result === 1) {
      console.log("Ban deleted successfully");
      res.json({ message: "Ban deleted successfully" });
    } else {
      console.error("Ban deletion failed");
      res.status(500).json({ error: "Ban deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting ban:", error);
    res
      .status(500)
      .json({ error: "Ban deletion failed", details: error.message });
  }
};
