import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  acceptRequest,
  addFriends,
  deleteRequest,
  getAllFriends,
  getAllUsers,
  refuseRequest,
  undoRequest,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.post("/add/:id", addFriends);
router.delete("/undo/:id", undoRequest);
router.post("/accept/:id", acceptRequest);
router.post("/refuse/:id", refuseRequest);
router.delete("/delete/:id", deleteRequest);
router.get("/list", getAllFriends);
router.get("/user", getAllUsers);

export default router;
