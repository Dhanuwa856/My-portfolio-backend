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

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ project_id: id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res
      .status(200)
      .json({ message: "Project fetched successfully", project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: "Server error while fetching project",
      error: error.message,
    });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate tags if provided
    if (
      updateData.tags &&
      (!Array.isArray(updateData.tags) || updateData.tags.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "Tags must be a non-empty array" });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { project_id: id },
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: "Server error while updating project",
      error: error.message,
    });
  }
};

// Delete a project by ID (optional, not in original code)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findOneAndDelete({
      project_id: id,
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: "Server error while deleting project",
      error: error.message,
    });
  }
};

// This code defines a set of controller functions for handling CRUD operations related to projects in a Node.js application using Express and Mongoose. Each function interacts with the MongoDB database to create, read, update, or delete project records. The functions also include error handling and validation to ensure that the data being processed is valid and complete.
