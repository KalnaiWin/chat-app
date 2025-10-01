import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../model/User.js";

export const protectRoute = async (req, res, next) => {
  // if(res success) will move to next (another function)
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password"); // get all field but not password
    if (!user) return res.status(404).json({ message: "User not found" });

    // if all success
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protecteRoute middleware: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
