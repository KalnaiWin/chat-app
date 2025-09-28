import express from "express"; // type: "module"
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config(); // allow using data from .env
const app = express();
const __dirname = path.resolve(); //  gets absolute path to backend folder

const port = process.env.PORT || 3000;

app.use(express.json()); // is a middleware that we calling to access field user sent by req.body 

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // tell express serve everything inside this folder

  app.get("/*splat", (_, res) => { // => every api/__ will be display as html
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // "../frontend/dist/index.html"
  });
}

app.listen(port, () => {
  console.log("Server running on port: ", port);
  connectDB();
});
