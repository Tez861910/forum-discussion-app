import { sequelize } from "../../../db.js";

export const handleGenderUpdate = async (req, res) => {
  const { genderId } = req.params;

  try {
    // Dynamically access the Departments model using sequelize.models
    const Genders = sequelize.models.Genders;
    // Assuming req.body contains the updated data for the gender
    const updatedGender = await Genders.update(req.body, {
      where: { GenderID: genderId },
    });

    res.status(200).json({
      success: true,
      message: "Gender updated successfully",
      data: updatedGender,
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
