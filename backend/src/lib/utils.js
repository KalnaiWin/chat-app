import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const genrateToken = (userId, res) => {
  // .sign( object , secretKey, option )
  const secrect = ENV.JWT_SECRET;
  if (!secrect) {
    throw new Error("JWT_SECRET is not configured");
  }
  const token = jwt.sign({ userId }, secrect, {
    expiresIn: "7d", // seven days
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // prevent CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
