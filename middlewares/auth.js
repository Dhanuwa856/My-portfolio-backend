import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Basic token verification
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based access middleware
export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.type !== role) {
      return res.status(403).json({ message: `Only ${role} users allowed` });
    }
    next();
  };
};
