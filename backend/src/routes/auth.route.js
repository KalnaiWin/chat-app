import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Sign Up Endpoint");
});

router.get("/login", (req, res) => {
  res.send("Login In Endpoint");
});

router.get("/logout", (req, res) => {
  res.send("Log Out Endpoint");
});

export default router;
