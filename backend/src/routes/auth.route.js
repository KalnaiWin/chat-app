import express from "express";

import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection); // if(every thing ok it will move to next function)

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile); // user can only update profile after authenticated ( sign in )
router.get("/check", protectRoute, (req, res) => { 
  res.status(200).json(req.user);
});

export default router;
