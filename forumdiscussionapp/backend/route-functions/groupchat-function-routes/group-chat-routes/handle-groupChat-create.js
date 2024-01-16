import { sequelize } from "../../../db.js";

export const handleGroupChatCreate = async (req, res) => {
  const {
    groupName,
    description,
    creatorUserId,
    isPublic,
    maxMembers,
    category,
    coverPhotoURL,
    welcomeMessage,
    moderatorUserId,
  } = req.body;

  try {
    if (!groupName || !creatorUserId) {
      console.log("GroupName and CreatorUserID are required");
      return res.status(400).json({
        error: "GroupName and CreatorUserID are required",
      });
    }

    // Dynamically access the GroupChats model using sequelize.models
    const GroupChats = sequelize.models.GroupChats;

    const result = await GroupChats.create({
      GroupName: groupName,
      Description: description,
      CreatorUserID: creatorUserId,
      IsPublic: isPublic,
      MaxMembers: maxMembers,
      Category: category,
      CoverPhotoURL: coverPhotoURL,
      WelcomeMessage: welcomeMessage,
      ModeratorUserID: moderatorUserId,
    });

    if (result) {
      console.log("Group chat created successfully");
      res.json({ message: "Group chat created successfully" });
    } else {
      console.error("Group chat creation failed");
      res.status(500).json({ error: "Group chat creation failed" });
    }
  } catch (error) {
    console.error("Error creating group chat:", error);
    res
      .status(500)
      .json({ error: "Group chat creation failed", details: error.message });
  }
};
