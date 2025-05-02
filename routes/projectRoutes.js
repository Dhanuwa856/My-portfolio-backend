import express from "express";
import { createProject } from "../Controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);

export default projectRouter;
// This code defines an Express router for handling project-related routes. It imports the `createProject` controller function and sets up a POST route at the root of the router ("/") to handle project creation requests. The router is then exported for use in other parts of the application.
