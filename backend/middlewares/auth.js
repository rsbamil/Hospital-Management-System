import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated = catchAsyncErrors(
  async (req, resizeBy, next) => {
    // Authentication
    const token = req.cookies.adminToken;
    if (!token) {
      return next(new ErrorHandler("Admin not authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    // Authorization

    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized to access this resource`,
          403
        )
      );
    }

    next();
  }
);

export const ispatientAuthenticated = catchAsyncErrors(
  async (req, resizeBy, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("Patient not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized to access this resource`,
          403
        )
      );
    }

    next();
  }
);
