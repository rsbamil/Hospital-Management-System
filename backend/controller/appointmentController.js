import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found in this department", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Multiple doctors found with the same name in this department so contact through email or phone",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    message: "Appointment created successfully",
    appointment,
  });
});

// Get All Appointments Controller
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

  res.status(200).json({
    success: true,
    appointments,
  });
});

// Update Appointment Status
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found"), 400);
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  }
);

// Delete an Appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let appointment = await Appointment.findByIdAndDelete(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }
  res
    .status(200)
    .json({
      success: true,
      message: "Appointment deleted successfully",
      appointment,
    });
});
