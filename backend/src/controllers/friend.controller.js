import User from "../model/User.js";

export const addFriends = async (req, res) => {
  const { id: friendId } = req.params;
  const userId = req.user._id;

  try {
    if (userId.equals(friendId)) {
      return res
        .status(400)
        .json({ message: "You cannot add friends yourself" });
    }

    const newFriend = await User.findById(friendId);
    const me = await User.findById(userId);

    if (!newFriend)
      return res.status(404).json({ message: "This user is not found" });

    if (me.friends.includes(newFriend._id))
      return res.status(400).json({ message: "Two you have been friend" });

    const alreadySent = newFriend.friendRequests.find(
      (id) => id.from.toString() === userId.toString()
    );
    if (alreadySent) {
      return res.status(400).json({ message: "Requst has already sent" });
    }

    newFriend.friendRequests.push({ from: userId });

    await newFriend.save();

    res.status(200).json({
      message: "Friend request sent!",
      friendRequests: newFriend.friendRequests,
    });
  } catch (error) {
    console.log("Error in add friends function: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const undoRequest = async (req, res) => {
  const { id: friendId } = req.params; 
  const userId = req.user._id;

  try {
    const me = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    me.friendRequests = me.friendRequests.filter(
      (reqId) => reqId.toString() !== friendId.toString()
    );

    friend.friendRequests = friend.friendRequests.filter(
      (req) => req.from.toString() !== userId.toString()
    );

    await me.save();
    await friend.save();

    res.status(200).json({ message: "Friend request canceled successfully" });
  } catch (error) {
    console.log("Error in undoFriendRequest:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptRequest = async (req, res) => {
  const { id: friendId } = req.params;
  const userId = req.user._id;

  try {
    const newFriend = await User.findById(friendId);
    const me = await User.findById(userId);

    if (!newFriend)
      return res.status(404).json({ message: "This user is not found" });

    const requestExist = me.friendRequests.find(
      (id) => id.from.toString() === friendId.toString()
    );
    if (!requestExist)
      res.status(400).json({ message: "No friend request exist" });

    newFriend.friends.push(me);
    me.friends.push(newFriend);

    me.friendRequests = me.friendRequests.filter(
      (id) => id.from.toString() !== friendId.toString()
    );

    await me.save();
    await newFriend.save();
    res.status(200).json({ message: "Accept friend successfully" });
  } catch (error) {
    console.log("Error in accept friends function: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const refuseRequest = async (req, res) => {
  const { id: friendId } = req.params;
  const userId = req.user._id;

  try {
    const me = await User.findById(userId);

    const requestExist = me.friendRequests.find(
      (id) => id.from.toString() === friendId.toString()
    );
    if (!requestExist)
      res.status(400).json({ message: "No friend request exist" });

    me.friendRequests = me.friendRequests.filter(
      (id) => id.from.toString() !== friendId.toString()
    );

    await me.save();
    res.status(200).json({ message: "Refuse friend successfully" });
  } catch (error) {
    console.log("Error in accept friends function: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  const { id: friendId } = req.params;
  const userId = req.user._id;

  try {
    const oldFriend = await User.findById(friendId);
    const me = await User.findById(userId);

    me.friends = me.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );

    // Remove userId from friend's friends
    oldFriend.friends = oldFriend.friends.filter(
      (id) => id.toString() !== userId.toString()
    );

    await me.save();
    await oldFriend.save();
    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (error) {
    console.log("Error in delete friends function: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const myId = req.user._id;
    const me = await User.findById(myId).populate(
      "friends",
      "fullName profilePic"
    );

    res.status(200).json(me.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const myId = req.user._id;

    const users = await User.find({ _id: { $ne: myId } }).select(
      "fullName email profilePic"
    );

    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};
