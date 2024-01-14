import { FriendRequests } from "../../../db.js";

export const handleRequestCreate = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const result = await FriendRequests.create({
      SenderID: senderId,
      ReceiverID: receiverId,
    });

    if (result) {
      console.log("Friend request created successfully");
      res.json({ message: "Friend request created successfully" });
    } else {
      console.error("Friend request creation failed");
      res.status(500).json({ error: "Friend request creation failed" });
    }
  } catch (error) {
    console.error("Error creating friend request:", error);
    res.status(500).json({
      error: "Friend request creation failed",
      details: error.message,
    });
  }
};
