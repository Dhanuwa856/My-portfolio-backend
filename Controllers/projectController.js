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
      !tags ||
      !Array.isArray(tags) ||
      tags.length === 0
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, main_img, description, and at least one tag",
      });
    }

    // Create and save project
    const project = new Project({
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
    // Detailed error response
    return res.status(500).json({
      message: "Server error while creating project",
      error: error.message,
    });
  }
};
