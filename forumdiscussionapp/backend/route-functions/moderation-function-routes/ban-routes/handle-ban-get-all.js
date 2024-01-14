import { Bans } from "../../../db.js";

export const handleBanGetAll = async (req, res) => {
  try {
    const result = await Bans.findAll();

    console.log("Bans retrieved successfully");
    res.json({ bans: result });
  } catch (error) {
    console.error("Error getting bans:", error);
    res
      .status(500)
      .json({ error: "Error getting bans", details: error.message });
  }
};
