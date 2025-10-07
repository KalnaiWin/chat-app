import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    friendRequests: {
      type: [
        {
          from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: () => [],
    },
  },
  { timestamps: true }
); // createdAt and updatedA

// Define user
const User = mongoose.model("User", userSchema);

export default User;
