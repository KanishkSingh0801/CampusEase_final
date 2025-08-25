import jwt from "jsonwebtoken";
import User from "../models/AdminModel.js";

export const protectAdminRoutes = async (req, res, next) => {
  console.log("Admin route protection middleware activated.");

  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(" ")[1];
      
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user to the request object
      req.user = await User.findById(decoded.id);

      // Check if the user is an admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ msg: "Access denied, not an admin." });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log("Error in admin verification:", error);

      // Handle any errors related to JWT verification
      res.status(401).json({
        msg: "Not authorized, token invalid or expired.",
      });
    }
  }

  // If no token is provided
  if (!token) {
    console.log("No token provided for admin verification.");
    res.status(401).json({
      msg: "Not authorized, token required.",
    });
  }
};
