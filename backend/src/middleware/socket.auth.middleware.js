import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../model/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // console.log("Socket connection attempt from:", socket.handshake.address);
    // console.log("Cookies:", socket.handshake.headers.cookie);

    // extarct token from http cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    // find the user from db
    const user = await User.findById(decoded.userId).select("-password"); // get all field but not password
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    next();
  } catch (error) {
    console.log("Error in socket authentication: ", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
