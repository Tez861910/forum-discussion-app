import { sequelize } from "../../../db.js";

export const handleGroupChatUpdateById = async (req, res) => {
  const { groupId } = req.params;
  const {
    groupName,
    description,
    isPublic,
    maxMembers,
    category,
    coverPhotoURL,
    welcomeMessage,
    moderatorUserId,
  } = req.body;

  try {
    // Dynamically access the GroupChats model using sequelize.models
    const GroupChats = sequelize.models.GroupChats;

    const result = await GroupChats.update(
      {
        GroupName: groupName,
        Description: description,
        IsPublic: isPublic,
        MaxMembers: maxMembers,
        Category: category,
        CoverPhotoURL: coverPhotoURL,
        WelcomeMessage: welcomeMessage,
        ModeratorUserID: moderatorUserId,
      },
      { where: { GroupID: groupId } }
    );

    if (result[0] === 1) {
      console.log("Group chat updated successfully");
      res.json({ message: "Group chat updated successfully" });
    } else {
      console.error("Group chat update failed");
      res.status(500).json({ error: "Group chat update failed" });
    }
  } catch (error) {
    console.error("Error updating group chat:", error);
    res
      .status(500)
      .json({ error: "Group chat update failed", details: error.message });
  }
};
