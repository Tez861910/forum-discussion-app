import { sequelize } from "../../../db.js";

export const handleGenderGetAll = async (req, res) => {
  try {
    // Dynamically access the Departments model using sequelize.models
    const Genders = sequelize.models.Genders;
    const allGenders = await Genders.findAll();

    res.status(200).json({
      success: true,
      message: "All genders retrieved successfully",
      data: allGenders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
