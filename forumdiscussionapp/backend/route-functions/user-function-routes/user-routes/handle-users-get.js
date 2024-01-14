import { User, CommonAttributes } from "../../../db.js";

export const handleUsersGet = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
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
