import { sequelize } from "../../../db.js";

export const handleGenderCreate = async (req, res) => {
  try {
    // Dynamically access the Departments model using sequelize.models
    const Genders = sequelize.models.Genders;
    // Assuming req.body contains the necessary data for creating a new gender
    const newGender = await Genders.create(req.body);

    res.status(201).json({
      success: true,
      message: "Gender created successfully",
      data: newGender,
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
