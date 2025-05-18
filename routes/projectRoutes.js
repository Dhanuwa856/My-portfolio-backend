import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../Controllers/projectController.js";
import { requireRole, verifyToken } from "../middlewares/auth.js";

const projectRouter = express.Router();

projectRouter.post("/", verifyToken, requireRole("admin"), createProject);
projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;

// This code defines an Express router for handling CRUD operations related to projects. It imports necessary functions from a controller file and sets up routes for creating, retrieving, updating, and deleting projects. The router is then exported for use in the main application file.
