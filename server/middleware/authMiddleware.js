import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ======================================
   PROTECT MIDDLEWARE (Verify Token)
====================================== */
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id & role
    next();

  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};


/* ======================================
   ADMIN ONLY MIDDLEWARE
====================================== */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};