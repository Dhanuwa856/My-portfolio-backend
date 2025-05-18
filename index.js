import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString).then(
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB", err);
  }
);

app.use("/api/projects", projectRouter); // Use the project router for all routes starting with /api/projects
app.use("/api/users", userRouter); // Use the user router for all routes starting with /api/users

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Server is running on port 5000");
});
