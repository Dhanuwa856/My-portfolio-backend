import Project from "../models/project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      main_img,
      demo_url,
      github_url,
      description,
      tags,
      screenshots,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !main_img ||
      !description ||
      !Array.isArray(tags) ||
      tags.length === 0
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, main_img, description, and at least one tag",
      });
    }

    // Determine next project_id
    const lastProject = await Project.findOne().sort({ project_id: -1 });
    const nextId =
      lastProject && lastProject.project_id ? lastProject.project_id + 1 : 1;

    // Create and save project
    const project = new Project({
      project_id: nextId,
      title,
      main_img,
      demo_url,
      github_url,
      description,
      tags,
      screenshots,
    });
    const savedProject = await project.save();

    // Success response
    return res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Server error while creating project",
      error: error.message,
    });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: "Server error while fetching projects",
      error: error.message,
    });
  }
};
