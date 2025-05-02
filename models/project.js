import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    main_img: {
      type: String,
      required: true,
    },
    demo_url: {
      type: String,
    },
    github_url: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    screenshots: {
      type: [String],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;

// This code defines a Mongoose schema and model for a "Project" entity in a MongoDB database. The schema includes fields for an external ID, title, main image URL, demo URL, GitHub URL, description, tags, and screenshots. It also automatically manages timestamps for when each project is created and updated. The model is then exported for use in other parts of the application.
