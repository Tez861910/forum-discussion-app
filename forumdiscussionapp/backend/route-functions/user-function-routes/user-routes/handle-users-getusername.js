import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleUsersGetUserName = async (req, res) => {
  const { userIds } = req.body;

  try {
    // Dynamically access the Users and CommonAttributes models using sequelize.models
    const { Users, CommonAttributes } = sequelize.models;

    // Fetch user data for the given user IDs
    const users = await Users.findAll({
      where: {
        UserID: { [Op.in]: userIds },
        "$CommonAttributes.IsDeleted$": false,
      },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
        },
      ],
      attributes: ["UserID", "UserName"],
    });

    const usernames = {};
    users.forEach((user) => {
      usernames[user.UserID] = user.UserName;
    });

    console.log("Usernames fetched successfully");
    res.json({ usernames });
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res
      .status(500)
      .json({ error: "Usernames retrieval failed", details: error.message });
  }
};
