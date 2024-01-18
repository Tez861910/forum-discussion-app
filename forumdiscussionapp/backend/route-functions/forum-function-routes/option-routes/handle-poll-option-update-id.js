import { sequelize } from "../../../db.js";

export const handlePollOptionUpdateById = async (req, res) => {
  const { pollOptionId } = req.params;
  const { optionText, UpdatedByUserID } = req.body;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!optionText) {
      console.log("OptionText is required for update");
      return res
        .status(400)
        .json({ error: "OptionText is required for update" });
    }

    const PollOptions = sequelize.models.PollOptions;

    // Update PollOption and insert UpdatedByUserID into corresponding CommonAttributes table
    const result = await sequelize.transaction(async (t) => {
      const [updatedRows] = await PollOptions.update(
        { OptionText: optionText },
        { where: { PollOptionID: pollOptionId }, transaction: t }
      );

      if (updatedRows === 1) {
        const updatedPollOption = await PollOptions.findOne({
          where: { PollOptionID: pollOptionId },
          transaction: t,
        });

        if (updatedPollOption) {
          await CommonAttributes.update(
            { UpdatedByUserID: UpdatedByUserID },
            {
              where: { AttributeID: updatedPollOption.CommonAttributeID },
              transaction: t,
            }
          );
        }
      }

      return updatedRows;
    });

    if (result === 1) {
      console.log("Poll option updated successfully");
      res.json({ message: "Poll option updated successfully" });
    } else {
      console.error("Poll option update failed");
      res.status(500).json({ error: "Poll option update failed" });
    }
  } catch (error) {
    console.error("Error updating poll option:", error);
    res
      .status(500)
      .json({ error: "Poll option update failed", details: error.message });
  }
};
