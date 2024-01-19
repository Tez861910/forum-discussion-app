import { sequelize } from "../../../db.js";

export const handleGenderDelete = async (req, res) => {
  const { genderId } = req.params;

  try {
    // Dynamically access the Departments model using sequelize.models
    const Genders = sequelize.models.Genders;
    // Assuming soft delete by updating IsDeleted flag
    const deletedGender = await Genders.update(
      { IsDeleted: true },
      { where: { GenderID: genderId } }
    );

    res.status(200).json({
      success: true,
      message: "Gender deleted successfully",
      data: deletedGender,
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
