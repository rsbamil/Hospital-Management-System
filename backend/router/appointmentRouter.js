import express from "express";
import {
  isAdminAuthenticated,
  ispatientAuthenticated,
} from "../middlewares/auth.js";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";

const router = express.Router();

// router for setting an appointment
router.post("/post", ispatientAuthenticated, postAppointment);

// router for getting all appointments
router.get("/getAll", isAdminAuthenticated, getAllAppointments);

// router to update appointment status
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);

// router to delete an appointment
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
