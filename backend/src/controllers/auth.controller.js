import bcrypt from "bcryptjs";

import User from "../model/User.js";
import { genrateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at leats 6 characters" });
    }
    // check email valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email: email }); // check email exist
    if (user) return res.status(400).json({ message: "Email already existed" });

    // Hashing password by bbcrypt algorythm
    const salt = await bcrypt.genSalt(10); // create a random data
    const hashedpassword = await bcrypt.hash(password, salt); // combine password and salt

    const newUser = new User({
      fullName,
      email,
      password: hashedpassword,
    });

    if (newUser) {
      genrateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        // has something created
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
