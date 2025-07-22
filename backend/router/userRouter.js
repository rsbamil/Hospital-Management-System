import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  ispatientAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

// user Register Router
router.post("/patient/register", patientRegister);

// user login router
router.post("/login", login);

// Admin Register Router
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);

// get all doctors
router.get("/doctors", getAllDoctors);

// get admin details
router.get("/admin/me", isAdminAuthenticated, getUserDetails);

// get patient details
router.get("/patient/me", ispatientAuthenticated, getUserDetails);

// admin Logout
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

// patient logout
router.get("/patient/logout", ispatientAuthenticated, logoutPatient);

// Add New Doctor
router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor);
export default router;
