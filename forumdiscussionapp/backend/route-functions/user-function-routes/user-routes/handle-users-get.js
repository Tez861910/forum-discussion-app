import { sequelize } from "../../../db.js";

export const handleUsersGet = async (req, res) => {
  try {
    // Dynamically access the Users, CommonAttributes, and Gender models using sequelize.models
    const { Users, CommonAttributes, Genders } = sequelize.models;

    const users = await Users.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
        {
          model: Genders,
          attributes: ["GenderName"],
        },
      ],
    });

    console.log("Users fetched successfully");
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "User retrieval failed", details: error.message });
  }
};
