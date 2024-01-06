import { query } from "../../../db.js";

export const handleUsersGet = async (req, res) => {
  try {
    const sql =
      "SELECT * FROM users u INNER JOIN CommonAttributes ca ON u.CommonAttributeID = ca.AttributeID WHERE ca.IsDeleted = FALSE";
    const results = await query(sql);

    console.log("Users fetched successfully");
    res.json({ users: results });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "User retrieval failed", details: error.message });
  }
};
